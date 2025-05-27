import React, { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import colors from "../utils/colors";
import axios from "axios";
import { getToken } from "../utils/auth";

const RichTextEditor = ({ show, form, totalPrice, notes, evaluate }) => {
  // const base_url = import.meta.env.VITE_BASE_URL;
  const token = getToken();
  const scrollRef = useRef(null);

  // console.log(evaluate);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        HTMLAttributes: {
          class: "my-1",
        },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
    ],
    content: ``,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Notes: ", notes);
    console.log("Evaluate: ", evaluate);
    console.log("Total Price: ", totalPrice);
    console.log("Form ", form);
    try {
      const response = await axios.post(
        `https://nice-bohr.212-227-199-118.plesk.page/api/v1/formData`,
        {
          formData: form,
          clientEvaluation: evaluate,
          cleanedNotes: notes,
          t_Price: totalPrice,
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
      toast.success("Data Send Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const copyToClipboard = async () => {
    if (!editor) return;

    const html = editor.getHTML();
    const text = editor.getText();

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
      toast.success("Copied");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy");
    }
  };
  useEffect(() => {
    if (editor && form) {
      let step = 3;
      let numberedContent = "";

      if (form.incorporation) {
        numberedContent += `<strong>[${step++}] Register Limited company </strong><br/>You can incorporate business through Companies House services - <a href="https://www.gov.uk/limited-company-formation/register-your-company">https://www.gov.uk/limited-company-formation/register-your-company</a> 
      The Companies House incorporation fee is £50 and can be paid by debit or credit card at the time of incorporation.
      Company is usually registered within 24 hours and will usually be set up for Corporation Tax at the same time. <br/><br/>`;
      }

      if (form.mettle_freeAgent) {
        numberedContent += `<strong>[${step++}] Mettle & FreeAgent </strong><br/>You can open business bank account with Mettle (by Natwest) for your business and you will get access to FreeAgent (accounting software) for free.
      You can read more about Mettle here - <a href="https://www.mettle.co.uk">https://www.mettle.co.uk</a> 
      FreeAgent software is here - <a href="https://www.freeagent.com/en/">https://www.freeagent.com/en/</a><br/><br/>`;
      }

      if (form.virtualAddress) {
        numberedContent += `<strong>[${step++}] Registered Business Address </strong><br/>If you do not want to use your home address to be publicly available (on Companies House) then you can consider the serviced virtual address.
      Some options below but you can search on Google and find the one that suits you better or are closest to your location.
      <br/> <a href="https://yourvirtualofficelondon.co.uk">https://yourvirtualofficelondon.co.uk</a>
      <br/> <a href="https://yourvirtualofficelondon.co.uk">https://yourvirtualofficelondon.co.uk</a><br/><br/>`;
      }

      if (form.trustPilot) {
        numberedContent += `<strong>[${step++}] Reviews </strong><br/>100's of clients have trusted Digital Accountant with their Accounting and Taxation needs. Feel free to check reviews from our existing clients.
      Trustpilot - <a href="https://uk.trustpilot.com/review/digital-accountant.co.uk">https://uk.trustpilot.com/review/digital-accountant.co.uk</a><br/><br/>`;
      }
      editor.commands.setContent(`
        <div>
        Hey ${form.clientName},<br/><br/>
        I hope you are well.<br/><br/>
        It was great to catch up with you. As per our conversation, please see the information regarding ${
          form.tradingName
        }
        <br/><br/>
  

         <strong>[1] Monthly services</strong><br/><br/> 


  The quote is based on your provided information - <strong>£${totalPrice.toFixed(
    2
  )} + VAT 20%</strong><br/>
  (50% will be off for the first 3 Months)<br/><br/>

Services Offered in the quoted price:
<br/>
${
  form.accountingSection
    ? `<strong>Accounting</strong> - This includes accounting advice, Statutory Accounts completion (for businesses ${form.salesRange}/year);<br/>`
    : ``
}
${
  form.bookkeepingSection
    ? `<strong>Bookkeeping</strong> - Reviewing and reconciling ${form.transactionsPerMonth} transactions per month;<br/>`
    : ``
}
${
  form.VATSection
    ? `<strong>VAT Returns</strong> - This includes VAT Returns ${form.range} per ${form.frequency};<br/>`
    : ``
}
${
  form.AssetSection
    ? `<strong>Asset Register</strong> - This includes asset registration of ${form.fixedAssets} assets;<br/>`
    : ``
}
${
  form.payrollSection
    ? `<strong>Payroll</strong> - This includes running payroll for ${form.employeeCount}  employee(s);<br/>`
    : ``
}
${
  form.pensionSection
    ? `<strong>Pension</strong> - This includes handle pension for ${form.pensionEmployeeCount} employee(s);<br/>`
    : ``
}
${
  form.CISSection
    ? `<strong>CIS</strong> - This includes CIS Registration of ${form.contractorsCount} contractors per ${form.reportingFrequency};<br/>`
    : ``
}
${
  form.multiCurrencySection
    ? `<strong>Multi-currency</strong> - This includes transactions in multiple currencies;<br/>`
    : ``
}
${
  form.custom1Section
    ? `<strong>${form.custom1Name}</strong> - ${form.custom1Description};<br/>`
    : ``
}
${
  form.custom2Section
    ? `<strong>${form.custom2Name}</strong> - ${form.custom2Description};<br/>`
    : ``
}
${
  form.pandlePRO
    ? `<strong>Software</strong> - Free access to accounting software Pandle PRO;<br/>`
    : ``
}


<br/>
  Any additional work required which is not covered by the ‘Services Offered’ will be agreed upon with you and charged at an hourly rate of <strong>£33.00 + VAT</strong> or a set fee (Historic work, Registration for or deregistration from VAT/PAYE/CIS/Pension and other taxes, Training, Dealing with queries on your behalf (incl. calls to HMRC), Director Self Assessment, Confirmation Statement, Additional reporting, etc.)
<br/><br/>
<strong>[2] Onboarding fee </strong><br/>

There is a one-off set-up fee of <strong>${
        form.onboardingfee
      }</strong> for new clients.<br/><br/>

        ${numberedContent}


  Let me know if the prices are okay with you and my team will start with the onboarding process.
  <br/><br/>


Kind regards,  
<br />
Rita Krekovska ACMA CGMA MiP<br />
Digital Accountant <br/><br/>

  E: <a href="mailto:info@digital-accountant.co.uk">info@digital-accountant.co.uk</a><br />
  P: 07757307576<br />
  W: <a href="https://www.digital-accountant.co.uk" target="_blank">www.digital-accountant.co.uk</a><br />
  YT: <a href="https://www.youtube.com/c/DigitalAccountant" target="_blank">https://www.youtube.com/c/DigitalAccountant</a>
</div>

      `);
    }
  }, [editor, form, totalPrice]);
  useEffect(() => {
    // Scroll to bottom when `show` becomes true
    if (show && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [show]);

  if (!show) return null; // Don't render if `show` is false

  return (
    <div className="relative border border-gray-300 rounded-lg shadow-sm">
      <div className="flex justify-center m-2 text-xl font-bold">Quote</div>

      {/* Copy button */}
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-6 z-10 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-gray-700 font-medium cursor-pointer"
      >
        <Copy className="w-5 h-5" />
        Copy
      </button>

      {/* Editor container with scroll */}
      <div
        ref={scrollRef}
        className="min-h-[600px] max-h-[400px] overflow-auto"
      >
        <EditorContent
          className="m-5 border border-gray-300 p-2 rounded bg-white"
          editor={editor}
        />
      </div>
      <div className="my-8 flex justify-center">
        <div>
          <button
            onClick={handleSubmit}
            className={`flex items-center font-medium py-2 px-4 rounded-lg transition duration-400 ease-in-out active:scale-[0.98] cursor-pointer`}
            style={{ backgroundColor: colors.primary, color: "white" }}
          >
            Save Quote & Generate Contract
          </button>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
