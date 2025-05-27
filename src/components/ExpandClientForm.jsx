import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Info, Save } from "lucide-react";
import colors from "../utils/colors";
import InputField from "./InputField";
import ExpandableSection from "./ExpandableSection";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";
import InputFieldDisabled from "./InputFieldDisabled";
import CustomCheckbox from "./CustomCheckbox";
import axios from "axios";
import Textarea from "./Textarea";
import InputFieldCSS from "./InputFieldCSS";
import priceFields from "../utils/priceSections";
import RiskSelector from "./RiskSelector";
import RichTextEditor from "./QuoteSection";
import toast, { Toaster } from "react-hot-toast";
import ClientEvaluation from "./ClientEvaluation";
import { Navigate, useNavigate } from "react-router";
import { getToken } from "../utils/auth";

export default function ExpandableClientForm({ sideNotes }) {
  const navigate = useNavigate();
  // const base_url = import.meta.env.VITE_BASE_URL;
  const [dropdownData, setDropdownData] = useState({}); // Store the array prices
  const [assetDataOption, setAssetDataOption] = useState([]);
  const [bookkeepingOption, setBookkeeepingOption] = useState([]);
  const [t_Price, setTPrice] = useState(0);
  const [quoteShow, setQuoteShow] = useState(false);

  const [clientEvaluation, setClientEvaluation] = useState({
    clientComment: "",
  });
  const token = getToken();

  const cleanedNotes = sideNotes
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line != "")
    .join("\n");

  const [formData, setFormData] = useState({
    //Client Details
    clientName: "",
    tradingName: "",
    phoneNumber: "",
    email: "",
    businessType: "",
    onboardingfee: "",
    //Accounting
    accountingSection: true,
    salesRange: "",
    salesPrice: 0,
    isCustomSalesPrice: false,
    customSalesPrice: 0,
    //Bookkeeping
    bookkeepingSection: true,
    transactionsPerMonth: "",
    transactionsPrice: 0,
    isCustomBookkeepingPrice: false,
    customBookkeepingPrice: 0,
    //VAT Returns
    VATSection: true,
    range: "",
    rangePrice: 0,
    frequency: "",
    frequencyOffset: 0,
    VATScheme: "",
    totalVATPrice: 0,
    isCustomVATPrice: false,
    customVATPrice: 0,
    //Asset Register
    AssetSection: true,
    fixedAssets: "",
    assetsPrice: 0,
    isCustomAssetPrice: false,
    customAssetPrice: 0,
    //Payroll
    payrollSection: true,
    employeeCount: "",
    payrollPrice: 0,
    payrollFrequency: "",
    employementAllowance: "",
    isCustomPayrollPrice: false,
    customPayrollPrice: null,
    //Pension
    pensionSection: true,
    pensionEmployeeCount: "",
    pensionPrice: 0,
    isCustomPensionPrice: false,
    customPensionPrice: 0,
    //CIS Registration
    CISSection: true,
    contractorsCount: "",
    contractorsPrice: 0,
    reportingFrequency: "",
    offset: 0,
    totalCISPrice: 0,
    isCustomCISPrice: false,
    customCISPrice: "",
    //Multicurrency
    multiCurrencySection: true,
    currencyPrice: 0,
    isCustomCurrencyPrice: false,
    customCurrencyPrice: 0,
    //Custom1
    custom1Section: false,
    custom1Name: "",
    custom1Description: "",
    custom1Price: 0,
    //Custom2
    custom2Section: false,
    custom2Name: "",
    custom2Description: "",
    custom2Price: 0,
    //Addiional Notes

    //Contract
    startDate: "",

    //Risk Scorecard
    industry: "",
    riskScoreData: {},
    riskType: "",

    //INFO related EMAIL
    incorporation: false,
    mettle_freeAgent: false,
    virtualAddress: false,
    trustPilot: false,
    pandlePRO: false,

    //Data & added by
    contractDate: "",
    addedBy: "Rita",
  });
  console.log(formData);

  useEffect(() => {
    axios
      .get(`https://nice-bohr.212-227-199-118.plesk.page/api/v1/getPrice`)
      .then((res) => {
        setDropdownData(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching form options:", err);
      });
  }, []);
  useEffect(() => {
    const price =
      Number(formData.rangePrice) + Number(formData.frequencyOffset);
    setFormData((prev) => ({
      ...prev,
      totalVATPrice: price.toFixed(2),
    }));
  }, [formData.rangePrice, formData.frequencyOffset]);
  useEffect(() => {
    const price = Number(formData.contractorsPrice) * Number(formData.offset);
    setFormData((prev) => ({
      ...prev,
      totalCISPrice: price.toFixed(2),
    }));
  }, [formData.contractorsPrice, formData.offset]);
  useEffect(() => {
    if (formData.businessType == "ST") {
      setBookkeeepingOption(dropdownData.bookkeepingRange_ST || []);
      setAssetDataOption(dropdownData.salesRange_ST || []);
    } else if (formData.businessType == "LTD") {
      setBookkeeepingOption(dropdownData.bookkeepingRange_LTD || []);
      setAssetDataOption(dropdownData.salesRange_LTD || []);
    } else {
      setAssetDataOption([]);
      setBookkeeepingOption([]);
    }
    setFormData((prev) => ({
      ...prev,
      salesRange: "",
      salesPrice: "",
      transactionsPerMonth: "",
      transactionsPrice: "",
    }));
  }, [formData.businessType, dropdownData]);
  useEffect(() => {
    const total = priceFields.reduce((sum, field) => {
      if (!formData[field.isSection]) {
        return sum + 0;
      }

      const condition = formData[field.isCustom];
      const price = condition
        ? Number(formData[field.customPrice] || 0)
        : Number(formData[field.defaultPrice] || 0);

      return sum + price;
    }, 0);

    setTPrice(total);
  }, [formData]);

  const handleChange = (e, fieldName = null) => {
    if (fieldName) {
      // Button clicked → manually toggle
      setFormData((prev) => ({
        ...prev,
        [fieldName]: !prev[fieldName],
      }));
    } else {
      // Checkbox changed
      const { name, value, type, checked } = e.target;
      console.log(
        "Name:",
        name,
        "Value:",
        value,
        "Type:",
        type,
        "Checked",
        checked
      );
      if (
        type == "button" &&
        formData.riskScoreData.client &&
        formData.riskScoreData.geographical &&
        formData.riskScoreData.industry &&
        formData.riskScoreData.transactional
      ) {
        {
          setFormData((prev) => ({
            ...prev,
            riskType: value,
          }));
        }
      } else if (type == "button") {
        toast(() => (
          <span>
            <Info className="inline mr-2" />
            Please select All risk levels
          </span>
        ));
      }

      if (name == "salesRange") {
        const selectedOption = salesRange.dataOption.find(
          (op) => op.label == value
        );
        setFormData((prev) => ({
          ...prev,
          salesRange: value,
          salesPrice: selectedOption ? selectedOption.price : "",
        }));
      }
      if (name == "transactionsPerMonth") {
        const selectedOption = transactionPerMonth.dataOption.find(
          (op) => op.label == value
        );
        setFormData((prev) => ({
          ...prev,
          transactionsPerMonth: value,
          transactionsPrice: selectedOption ? selectedOption.price : "",
        }));
      }
      if (name == "range") {
        const selectedOption = dropdownData.VAT_range.find(
          (op) => op.label == value
        );
        setFormData((prev) => ({
          ...prev,
          range: value,
          rangePrice: selectedOption ? selectedOption.price : "",
        }));
      }
      if (name == "frequency") {
        const selectedOption = dropdownData.VAT_frequency.find(
          (op) => op.label == value
        );

        setFormData((prev) => ({
          ...prev,
          frequency: value,
          frequencyOffset: selectedOption ? selectedOption.price : "",
        }));
      }
      if (name == "fixedAssets") {
        const selectedOption = dropdownData.asset.find(
          (op) => op.label == value
        );

        setFormData((prev) => ({
          ...prev,
          fixedAssets: value,
          assetsPrice: selectedOption ? selectedOption.price : "",
        }));
      }
      if (name == "employeeCount") {
        const selectedOption = dropdownData.payroll.find(
          (op) => op.label == value
        );

        setFormData((prev) => ({
          ...prev,
          employeeCount: value,
          payrollPrice: selectedOption ? selectedOption.price : "",
        }));
      }
      if (name == "pensionEmployeeCount") {
        const selectedOption = dropdownData.pension.find(
          (op) => op.label == value
        );

        setFormData((prev) => ({
          ...prev,
          pensionEmployeeCount: value,
          pensionPrice: selectedOption ? selectedOption.price : "",
        }));
      }
      if (name == "contractorsCount") {
        const selectedOption = dropdownData.CIS.find((op) => op.label == value);

        setFormData((prev) => ({
          ...prev,
          contractorsCount: value,
          contractorsPrice: selectedOption ? selectedOption.price : "",
        }));
      }
      if (name == "reportingFrequency") {
        const selectedOption = dropdownData.CIS_frequency.find(
          (op) => op.label == value
        );

        setFormData((prev) => ({
          ...prev,
          reportingFrequency: value,
          offset: selectedOption ? selectedOption.price : "",
        }));
      }
      if (type === "checkbox") {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      } else if (type != "button") {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        `https://nice-bohr.212-227-199-118.plesk.page/api/v1/formData`,
        {
          formData: formData,
          clientEvaluation: clientEvaluation,
          cleanedNotes: cleanedNotes,
          t_Price: t_Price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  //Clients
  const clientName = {
    id: "clientName",
    label: "Client Name",
    type: "text",
    value: formData.clientName,
    onChangeFunction: handleChange,
    placeholder: "Enter Client Name",
    isCustom: true,
  };
  const tradingName = {
    id: "tradingName",
    label: "Trading Name",
    type: "text",
    value: formData.tradingName,
    onChangeFunction: handleChange,
    placeholder: "Enter Trading Name",
    isCustom: true,
  };
  const phoneNo = {
    id: "phoneNumber",
    label: "Phone No.",
    type: "text",
    value: formData.phoneNumber,
    onChangeFunction: handleChange,
    placeholder: "Enter Phone number",
    isCustom: true,
  };
  const email = {
    id: "email",
    label: "Email",
    type: "email",
    value: formData.email,
    onChangeFunction: handleChange,
    placeholder: "Enter Email Address",
    isCustom: true,
  };
  const businessType = {
    id: "businessType",
    label: "Business Type",
    value: formData.businessType,
    onChangeFunction: handleChange,
    placeholder: "Select Business Type",
    dataOption: [
      { value: "ST", label: "ST" },
      { value: "LTD", label: "LTD" },
    ],
    isCustom: true,
  };
  const onboardingfee = {
    id: "onboardingfee",
    label: "Onboarding Fee",
    checked: formData.onboardingfee,
    onChangeFunction: handleChange,
    placeholder: "Select Onboarding Fee",
    dataOption: [
      { value: 29.95, label: "£29.95" },
      { value: 49.95, label: "£49.95" },
      { value: 59.95, label: "£59.95" },
    ],
    isCustom: true,
  };
  //Sales
  const salesRange = {
    id: "salesRange",
    label: "Sales Range",
    value: formData.salesRange,
    onChangeFunction: handleChange,
    placeholder: "Select Sales Range",
    dataOption: assetDataOption,
  };
  const salesPrice = {
    id: "salesPrice",
    label: "Sales Price",
    type: "text",
    value: formData.salesPrice,
    onChangeFunction: handleChange,
    placeholder: "",
  };
  const customSalesPrice = {
    id: "customSalesPrice",
    label: "Custom Price",
    type: "number",
    value: formData.customSalesPrice,
    onChangeFunction: handleChange,
    placeholder: "Price",
    isCustom: formData.isCustomSalesPrice,
  };
  //Bookkeeping
  const transactionPerMonth = {
    id: "transactionsPerMonth",
    label: "Transaction Per Month",
    value: formData.transactionsPerMonth,
    onChangeFunction: handleChange,
    placeholder: "Select Transactions",
    dataOption: bookkeepingOption,
  };
  const transactionPrice = {
    id: "transactionsPrice",
    label: "Transactions Price",
    type: "number",
    value: formData.transactionsPrice,
    onChangeFunction: handleChange,
    placeholder: "",
  };
  const customBookkeepingPrice = {
    id: "customBookkeepingPrice",
    label: "Custom Price",
    type: "number",
    value: formData.customBookkeepingPrice,
    onChangeFunction: handleChange,
    placeholder: "Price",
    isCustom: formData.isCustomBookkeepingPrice,
  };
  //VAT
  const VATRange = {
    id: "range",
    label: "VAT Range",
    value: formData.range,
    onChangeFunction: handleChange,
    placeholder: "Select Range",
    dataOption: dropdownData?.VAT_range ?? [],
  };
  const rangePrice = {
    id: "rangePrice",
    label: "Range Price",
    type: "number",
    value: formData.rangePrice,
    onChangeFunction: handleChange,
    placeholder: "",
  };
  const VATFrequency = {
    id: "frequency",
    label: "Frequency",
    value: formData.frequency,
    onChangeFunction: handleChange,
    placeholder: "Select Frequency",
    dataOption: dropdownData?.VAT_frequency ?? [],
  };
  const VATFrequencyOffset = {
    id: "frequencyOffset",
    label: "Offset",
    type: "number",
    value: formData.frequencyOffset,
    onChangeFunction: handleChange,
    placeholder: "",
  };
  const VATScheme = {
    id: "VATScheme",
    label: "VAT Scheme",
    checked: formData.VATScheme,
    onChangeFunction: handleChange,
    placeholder: "Select Scheme",
    dataOption: [
      { value: "STD Cash", label: "STD Cash" },
      { value: "Invoice", label: "Invoice" },
      { value: "Flat FRS", label: "Flat FRS" },
    ],
  };
  const totalPrice = {
    id: "totalVATPrice",
    label: "Total Price",
    type: "number",
    value: formData.totalVATPrice,
    onChangeFunction: handleChange,
    placeholder: "",
  };
  const customVATPrice = {
    id: "customVATPrice",
    label: "Custom Price",
    type: "number",
    value: formData.customVATPrice,
    onChangeFunction: handleChange,
    placeholder: "Price",
    isCustom: formData.isCustomVATPrice,
  };
  //Asset Register
  const assetRange = {
    id: "fixedAssets",
    label: "Asset Range",
    value: formData.fixedAssets,
    onChangeFunction: handleChange,
    placeholder: "Select Range",
    dataOption: dropdownData?.asset ?? [],
  };
  const assetPrice = {
    id: "assetsPrice",
    label: "Asset Price",
    type: "number",
    value: formData.assetsPrice,
    onChangeFunction: handleChange,
    placeholder: "",
  };
  const customAssetPrice = {
    id: "customAssetPrice",
    label: "Custom Price",
    type: "number",
    value: formData.customAssetPrice,
    onChangeFunction: handleChange,
    placeholder: "Custom Price",
    isCustom: formData.isCustomAssetPrice,
  };
  //Payroll
  const employeeCount = {
    id: "employeeCount",
    label: "Employee Count",
    value: formData.employeeCount,
    onChangeFunction: handleChange,
    placeholder: "Select Employee Count",
    dataOption: dropdownData?.payroll ?? [],
  };
  const payrollPrice = {
    id: "payrollPrice",
    label: "Payroll Price",
    type: "number",
    value: formData.payrollPrice,
    onChangeFunction: handleChange,
    placeholder: "",
  };
  const payrollFrequency = {
    id: "payrollFrequency",
    label: "Payroll Frequency",
    checked: formData.payrollFrequency,
    onChangeFunction: handleChange,
    placeholder: "Select Payroll Frequency",
    dataOption: [
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
    ],
  };
  const employmentAllowance = {
    id: "employementAllowance",
    label: "Employment Allowance",
    checked: formData.employementAllowance,
    onChangeFunction: handleChange,
    placeholder: "Select Employment Allowance",
    dataOption: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  };
  const customPayrollPrice = {
    id: "customPayrollPrice",
    label: "Custom Price",
    type: "number",
    value: formData.customPayrollPrice,
    onChangeFunction: handleChange,
    placeholder: "",
    isCustom: formData.isCustomPayrollPrice,
  };
  //Pension
  const pensionEmployeeCount = {
    id: "pensionEmployeeCount",
    label: "Employee Count",
    value: formData.pensionEmployeeCount,
    onChangeFunction: handleChange,
    placeholder: "Select Employee Count",
    dataOption: dropdownData?.pension ?? [],
  };
  const pensionPrice = {
    id: "pensionPrice",
    label: "Pension Price",
    type: "number",
    value: formData.pensionPrice,
    onChangeFunction: handleChange,
    placeholder: "",
  };
  const customPensionPrice = {
    id: "customPensionPrice",
    label: "Custom Price",
    type: "number",
    value: formData.customPensionPrice,
    onChangeFunction: handleChange,
    placeholder: "",
    isCustom: formData.isCustomPensionPrice,
  };
  //CIS
  const contractorsCount = {
    id: "contractorsCount",
    label: "CIS Contractors",
    value: formData.contractorsCount,
    onChangeFunction: handleChange,
    placeholder: "Select CIS Contractors",
    dataOption: dropdownData?.CIS ?? [],
  };
  const contractorsPrice = {
    id: "contractorsPrice",
    label: "Price",
    type: "number",
    value: formData.contractorsPrice,
    onChangeFunction: handleChange,
    placeholder: "",
  };
  const reportingFrequency = {
    id: "reportingFrequency",
    label: "Reporting Frequency",
    value: formData.reportingFrequency,
    onChangeFunction: handleChange,
    placeholder: "Select Frequency",
    dataOption: dropdownData?.CIS_frequency ?? [],
  };
  const reportingOffset = {
    id: "offset",
    label: "Offset",
    type: "number",
    value: formData.offset,
    onChangeFunction: handleChange,
    placeholder: "",
  };
  const totalCISPrice = {
    id: "totalCISPrice",
    label: "Total Price",
    type: "number",
    value: formData.totalCISPrice,
    onChangeFunction: handleChange,
    placeholder: "",
  };
  const customCISPrice = {
    id: "customCISPrice",
    label: "Custom Price",
    type: "number",
    value: formData.customCISPrice,
    onChangeFunction: handleChange,
    placeholder: "",
    isCustom: formData.isCustomCISPrice,
  };
  //Multi Currency
  const multiCurrencyRange = {
    id: "currencyPrice",
    label: "Multi Currency Charges",
    value: formData.currencyPrice,
    onChangeFunction: handleChange,
    placeholder: "Select Amount",
    dataOption: dropdownData?.multi_Currency ?? [],
  };
  const multiCurrencyPrice = {
    id: "customCurrencyPrice",
    label: "Custom Price",
    type: "number",
    value: formData.customCurrencyPrice,
    onChangeFunction: handleChange,
    placeholder: "",
    isCustom: formData.isCustomCurrencyPrice,
  };
  //Custom 1
  const custom1Name = {
    id: "custom1Name",
    label: "Service Name",
    type: "text",
    value: formData.custom1Name,
    onChangeFunction: handleChange,
    placeholder: "Enter Service Name",
    isCustom: true,
  };
  const custom1Description = {
    id: "custom1Description",
    label: "Service Description",
    value: formData.custom1Description,
    onChangeFunction: handleChange,
    placeholder: "Enter Service Description",
    rows: 3,
    cols: 20,
  };
  const custom1Price = {
    id: "custom1Price",
    label: "Service Price",
    type: "number",
    value: formData.custom1Price,
    onChangeFunction: handleChange,
    placeholder: "",
    classes: "col-start-4",
  };
  //Custom 2
  const custom2Name = {
    id: "custom2Name",
    label: "Service Name",
    type: "text",
    value: formData.custom2Name,
    onChangeFunction: handleChange,
    placeholder: "Enter Service Name",
    isCustom: true,
  };
  const custom2Description = {
    id: "custom2Description",
    label: "Service Description",
    value: formData.custom2Description,
    onChangeFunction: handleChange,
    placeholder: "Enter Service Description",
    rows: 3,
    cols: 20,
  };
  const custom2Price = {
    id: "custom2Price",
    label: "Service Price",
    type: "number",
    value: formData.custom2Price,
    onChangeFunction: handleChange,
    placeholder: "",
    classes: "col-start-4",
  };
  const industry = {
    id: "industry",
    label: "Industry Name",
    type: "text",
    value: formData.industry,
    onChangeFunction: handleChange,
    placeholder: "Enter Industry Name",
    isCustom: true,
  };

  //addedBy
  const dateField = {
    id: "contractDate",
    label: "Contract Date",
    type: "date",
    value: formData.contractDate,
    onChangeFunction: handleChange,
    placeholder: "Select Date",
    classes: "",
    isCustom: true,
  };
  const addedBy = {
    id: "addedBy",
    label: "Added By",
    type: "text",
    value: formData.addedBy,
    onChangeFunction: handleChange,
    placeholder: "Type Name",
    classes: "",
  };

  return (
    <>
      <Toaster />
      <div
        className="p-2 bg-white rounded-lg shadow-sm"
        style={{ backgroundColor: colors.inputBg }}
      >
        <div className="sticky top-0 bg-white z-40 p-5 shadow-md border-0 rounded-xl m-2 flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex items-center gap-5 flex-wrap">
              <div className="text-lg font-bold">Services:</div>
              <div>
                <Checkbox
                  label={"Accounting"}
                  name="accountingSection"
                  checked={formData.accountingSection}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Checkbox
                  label={"Bookkeeping"}
                  name="bookkeepingSection"
                  checked={formData.bookkeepingSection}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Checkbox
                  label={"VAT Returns"}
                  name="VATSection"
                  checked={formData.VATSection}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Checkbox
                  label={"Asset Register"}
                  name="AssetSection"
                  checked={formData.AssetSection}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Checkbox
                  label={"Payroll"}
                  name="payrollSection"
                  checked={formData.payrollSection}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Checkbox
                  label={"Pension"}
                  name="pensionSection"
                  checked={formData.pensionSection}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Checkbox
                  label={"CIS Registration"}
                  name="CISSection"
                  checked={formData.CISSection}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Checkbox
                  label={"Multi Currency"}
                  name="multiCurrencySection"
                  checked={formData.multiCurrencySection}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Checkbox
                  label={"Custom 1"}
                  name="custom1Section"
                  checked={formData.custom1Section}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Checkbox
                  label={"Custom 2"}
                  name="custom2Section"
                  checked={formData.custom2Section}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <div className="text-lg font-bold mr-[35px]">Info:</div>
            <div>
              <Checkbox
                label={"Incorporation"}
                name="incorporation"
                checked={formData.incorporation}
                onChange={handleChange}
              />
            </div>
            <div>
              <Checkbox
                label={"Mettle & Free Agent"}
                name="mettle_freeAgent"
                checked={formData.mettle_freeAgent}
                onChange={handleChange}
              />
            </div>
            <div>
              <Checkbox
                label={"Virtual Address"}
                name="virtualAddress"
                checked={formData.virtualAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <Checkbox
                label={"Trust Pilot"}
                name="trustPilot"
                checked={formData.trustPilot}
                onChange={handleChange}
              />
            </div>
            <div>
              <Checkbox
                label={"Pandle PRO"}
                name="pandlePRO"
                checked={formData.pandlePRO}
                onChange={handleChange}
              />
            </div>
            <div className="ml-10 text-xl font-semibold ">
              Price: {t_Price.toFixed(2)}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information Section - Open by default */}
          <ExpandableSection title="Client Details" isOpenByDefault={true}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <InputField data={clientName} />
              <InputField data={tradingName} />
              <InputField data={phoneNo} />
              <InputField data={email} />
              <Dropdown data={businessType} />
              <Dropdown data={onboardingfee} />
            </div>
          </ExpandableSection>
          {/*Accounting Section*/}
          <ExpandableSection
            title="Accounting"
            isOpenByDefault={formData.accountingSection}
            onChange={handleChange}
            name="accountingSection"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 ">
              <Dropdown data={salesRange} />
              <InputFieldDisabled data={salesPrice} />
              <CustomCheckbox
                label={"Custom Price"}
                name={"isCustomSalesPrice"}
                checked={formData.isCustomSalesPrice}
                onChange={handleChange}
              />
              <InputField data={customSalesPrice} />
            </div>
          </ExpandableSection>
          {/* Bookkeeping Section */}
          <ExpandableSection
            title="Bookkeeping"
            isOpenByDefault={formData.bookkeepingSection}
            name="bookkeepingSection"
            onChange={handleChange}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Dropdown data={transactionPerMonth} />
              <InputFieldDisabled data={transactionPrice} />
              <CustomCheckbox
                label={"Custom Price"}
                name={"isCustomBookkeepingPrice"}
                checked={formData.isCustomBookkeepingPrice}
                onChange={handleChange}
              />
              <InputField data={customBookkeepingPrice} />
            </div>
          </ExpandableSection>
          {/* VAT Section */}
          <ExpandableSection
            title="VAT Returns"
            isOpenByDefault={formData.VATSection}
            name="VATSection"
            onChange={handleChange}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Dropdown data={VATRange} />
              <InputFieldDisabled data={rangePrice} />
              <Dropdown data={VATFrequency} />
              <InputFieldDisabled data={VATFrequencyOffset} />
              <Dropdown data={VATScheme} />
              <InputFieldDisabled data={totalPrice} />
              <CustomCheckbox
                label={"Custom Price"}
                name={"isCustomVATPrice"}
                checked={formData.isCustomVATPrice}
                onChange={handleChange}
              />
              <InputField data={customVATPrice} />
            </div>
          </ExpandableSection>

          {/* Asset Register Section */}
          <ExpandableSection
            title="Asset Register"
            isOpenByDefault={formData.AssetSection}
            name="AssetSection"
            onChange={handleChange}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Dropdown data={assetRange} />
              <InputFieldDisabled data={assetPrice} />
              <CustomCheckbox
                label={"Custom Price"}
                name={"isCustomAssetPrice"}
                checked={formData.isCustomAssetPrice}
                onChange={handleChange}
              />
              <InputField data={customAssetPrice} />
            </div>
          </ExpandableSection>

          {/* Payroll Section */}
          <ExpandableSection
            title="Payroll"
            isOpenByDefault={formData.payrollSection}
            name="payrollSection"
            onChange={handleChange}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Dropdown data={employeeCount} />
              <InputFieldDisabled data={payrollPrice} />
              <Dropdown data={payrollFrequency} />
              <Dropdown data={employmentAllowance} />
              <CustomCheckbox
                classes={"col-start-3"}
                label={"Custom Price"}
                name={"isCustomPayrollPrice"}
                checked={formData.isCustomPayrollPrice}
                onChange={handleChange}
              />
              <InputField data={customPayrollPrice} />
            </div>
          </ExpandableSection>

          {/* Pension Section */}
          <ExpandableSection
            title="Pension"
            isOpenByDefault={formData.pensionSection}
            name="pensionSection"
            onChange={handleChange}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Dropdown data={pensionEmployeeCount} />
              <InputFieldDisabled data={pensionPrice} />
              <CustomCheckbox
                label={"Custom Price"}
                name={"isCustomPensionPrice"}
                checked={formData.isCustomPensionPrice}
                onChange={handleChange}
              />
              <InputField data={customPensionPrice} />
            </div>
          </ExpandableSection>

          {/* CIS Registration Section */}
          <ExpandableSection
            title="CIS Registration"
            isOpenByDefault={formData.CISSection}
            name="CISSection"
            onChange={handleChange}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Dropdown data={contractorsCount} />
              <InputFieldDisabled data={contractorsPrice} />
              <Dropdown data={reportingFrequency} />
              <InputFieldDisabled data={reportingOffset} />
              <InputFieldDisabled data={totalCISPrice} />
              <CustomCheckbox
                classes={"col-start-3"}
                label={"Custom Price"}
                name={"isCustomCISPrice"}
                checked={formData.isCustomCISPrice}
                onChange={handleChange}
              />
              <InputField data={customCISPrice} />
            </div>
          </ExpandableSection>

          {/*Multi Currency Section */}
          <ExpandableSection
            title="Multi Currency"
            isOpenByDefault={formData.multiCurrencySection}
            name="multiCurrencySection"
            onChange={handleChange}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Dropdown data={multiCurrencyRange} />
              <CustomCheckbox
                classes={"col-start-3"}
                label={"Custom Price"}
                name={"isCustomCurrencyPrice"}
                checked={formData.isCustomCurrencyPrice}
                onChange={handleChange}
              />
              <InputField data={multiCurrencyPrice} />
            </div>
          </ExpandableSection>

          {/*Csutom 1 Section */}
          <ExpandableSection
            title="Custom 1"
            isOpenByDefault={formData.custom1Section}
            name="custom1Section"
            onChange={handleChange}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <InputField data={custom1Name} />
              <InputFieldCSS data={custom1Price} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mt-5">
              <Textarea data={custom1Description} />
            </div>
          </ExpandableSection>

          {/*Csutom 2 Section */}
          <ExpandableSection
            title="Custom 2"
            isOpenByDefault={formData.custom2Section}
            name="custom2Section"
            onChange={handleChange}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <InputField data={custom2Name} />
              <InputFieldCSS data={custom2Price} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mt-5">
              <Textarea data={custom2Description} />
            </div>
          </ExpandableSection>

          {/* Riskcard Section */}
          <ExpandableSection title="Risk Scorecard" isOpenByDefault={true}>
            <div>
              <RiskSelector
                id={formData.riskType}
                data={formData.riskScoreData}
                onChangeFunction={handleChange}
                industry={industry}
                setRiskData={setFormData}
              />
            </div>
          </ExpandableSection>
          {/* Riskcard Section */}
          <ExpandableSection title="Client Evaluation" isOpenByDefault={true}>
            <div>
              <ClientEvaluation
                data={clientEvaluation}
                setData={setClientEvaluation}
              />
            </div>
          </ExpandableSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 ml-3 mb-10">
            <InputFieldCSS data={dateField} />
            <InputFieldCSS data={addedBy} />
          </div>
        </form>
        <div className="flex justify-center">
          <button
            onClick={() => {
              setQuoteShow(!quoteShow);
              console.log(formData);
            }}
            className={`flex items-center font-medium py-2 px-4 rounded-lg transition duration-400 ease-in-out active:scale-[0.98] cursor-pointer`}
            style={{ backgroundColor: colors.primary, color: "white" }}
          >
            Generate Quote
          </button>
        </div>
        <div className="mt-5">
          <RichTextEditor
            form={formData}
            show={quoteShow}
            totalPrice={t_Price}
            notes={cleanedNotes}
            evaluate={clientEvaluation}
          />
        </div>
      </div>
    </>
  );
}
