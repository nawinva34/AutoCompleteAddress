import React, { useState, useEffect } from "react";
import { Input, Form, Select, Button, Option } from "antd";
import "./styles.css";
import axios from "axios";
  
const TableExample = () => {
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [amphureOptions, setAmphureOptions] = useState([]);
  const [tambonOptions, setTambonOptions] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [province, setProvince] = useState("");
  const [amphure, setAmphure] = useState("");
  const [tambon, setTambon] = useState("");

  const [address, setAddress] = useState({
    province: "",
    zipCode: "",
    amphur: "",
    tambon: ""
  });

  console.log("zip", zipCode);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
      )
      .then((response) => setProvinceOptions(response.data));
  }, []);

  // console.log(provinceOptions);
  // console.log(amphureOptions)

  const provinces = provinceOptions.map((item) => {
    return { value: item.name_th };
  });

  useEffect(() => {
    const ampur = provinceOptions?.filter((amphureOption) => {
      // console.log(amphureOption.name_th, value);
      return amphureOption.name_th === province;
    });
    const amphures = ampur[0]?.amphure?.map((item) => {
      // console.log("item", item, ampur);
      return { ...item, value: item.name_th };
    });
    setAmphureOptions(amphures);
    setAmphure("");
    // console.log(amphures);
  }, [province]);

  useEffect(() => {
    const tomboon = amphureOptions?.filter((tombonm) => {
      // console.log(tombonm.name_th);
      // console.log(tombonm.name_th , amphure)
      return tombonm.name_th === amphure;
    });

    // console.log(tomboon)
    const tombons = tomboon[0]?.tambon.map((item) => {
      // console.log(item)
      return { ...item, value: item.name_th, zipCode: item.zip_code };
    });
    setTambonOptions(tombons);
    setTambon("");
    // console.log(tambonOptions);
    console.log("tombon", tombons);
  }, [amphure]);

  useEffect(() => {
    const zip = tambonOptions?.filter((zipp) => {
      return zipp.name_th === tambon;
    });
    setZipCode(zip[0]?.zip_code);
  }, [tambon]);

  console.log(zipCode);

  // console.log(tambonOptions);

  const handleProvinceChange = (value) => {
    setProvince(value);
    setAddress({ ...address, province: value });
    console.log("value", value);
  };

  console.log("add", address);

  const handleAmphureChange = (value) => {
    setAmphure(value);
    setAddress({ ...address, amphur: value });
  };

  const handleTambonChange = (value) => {
    setTambon(value);
    setAddress({ ...address, tambon: value });
    const zip = tambonOptions?.find((zipp) => {
      return zipp.name_th === value;
    });
    const newZipCode = zip?.zip_code ?? "";
    console.log("newZIp", zip?.zip_code);
    setZipCode(newZipCode);
    console.log("newzip", newZipCode);
    form.setFieldsValue({ zipcode: newZipCode });
  };

  const onFinish = (value) => {
    console.log("value", value);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <>
      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical"
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="จังหวัด" className="h-[38px]" name="province">
          <Select
            onChange={handleProvinceChange}
            style={{
              width: 200
            }}
          >
            {provinceOptions.map((country) => (
              <Select.Option key={country.id} value={country.name_th}>
                {country.name_th}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="เขต/อำเภอ" name="amphure">
          <Select
            onChange={handleAmphureChange}
            style={{
              width: 200
            }}
          >
            {amphureOptions?.map((country) => (
              <Select.Option key={country.id} value={country.name_th}>
                {country.name_th}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="เขต/อำเภอ" name="tambon">
          <Select
            onChange={handleTambonChange}
            style={{
              width: 200
            }}
          >
            {tambonOptions?.map((country) => (
              <Select.Option key={country.id} value={country.name_th}>
                {country.name_th}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <span>รหัสไปรษณีย์ : </span>
        <Form.Item name="zipcode">
          <Input
            style={{ width: 200 }}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TableExample;
