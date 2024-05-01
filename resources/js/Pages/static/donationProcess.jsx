import { Head, Link } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";

const donationProcess = ({ auth }) => {
  return (
    <Guest user={auth.user}>
      <Head title="Donation Process" />
      {/* <section className="bg-white dark:bg-gray-900">
        <div className="pt-8 px-4 mx-auto max-w-screen-xl text-center lg:pt-8 lg:px-12">
          <h1 className="sm:text-5xl text-xl font-black">
            The Blood Donation Process
          </h1>
          <p className="text-lg font-normal text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
            Donating blood is a simple and safe process that can save lives.
            Here’s what you can expect when you donate blood.
          </p>
          <div className="sm:m-20 px-10 text-start">
            <div>
              <h2 className="text-xl font-bold">
                The Blood Donation Process: Saving Lives One Donation at a Time
              </h2>
              <p className="text-lg font-normal text-gray-500 lg:my-5 md:text-lg lg:text-xl dark:text-gray-400">
                Blood donation is a crucial aspect of healthcare systems
                worldwide, playing a pivotal role in saving countless lives
                every day. Whether for emergency transfusions, surgeries, or
                treating chronic conditions, donated blood remains an
                indispensable resource. Understanding the blood donation process
                is essential for both donors and recipients, ensuring safe and
                efficient collection, testing, and distribution of this
                life-sustaining fluid.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                The Blood Donation Process: Saving Lives One Donation at a Time
              </h2>
              <p className="text-lg font-normal text-gray-500 lg:my-5 md:text-lg lg:text-xl dark:text-gray-400">
                Blood donation is a crucial aspect of healthcare systems
                worldwide, playing a pivotal role in saving countless lives
                every day. Whether for emergency transfusions, surgeries, or
                treating chronic conditions, donated blood remains an
                indispensable resource. Understanding the blood donation process
                is essential for both donors and recipients, ensuring safe and
                efficient collection, testing, and distribution of this
                life-sustaining fluid.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                The Blood Donation Process
              </h1>
            </header>
            <p className="lead">
              Blood donation is a crucial aspect of healthcare systems
              worldwide, playing a pivotal role in saving countless lives every
              day. Whether for emergency transfusions, surgeries, or treating
              chronic conditions, donated blood remains an indispensable
              resource. Understanding the blood donation process is essential
              for both donors and recipients, ensuring safe and efficient
              collection, testing, and distribution of this life-sustaining
              fluid.
            </p>
            <div>
              <h3 className="my-4 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
                Pre-Donation Preparation:
              </h3>
              <p>
                Before donating blood, individuals undergo a screening process
                to ensure their eligibility and the safety of the donated blood.
                This typically involves completing a questionnaire to assess
                medical history, lifestyle habits, and recent travel, aiming to
                identify any factors that might affect the donor's health or the
                suitability of their blood for transfusion.
              </p>
            </div>
            <div>
              <h3 className="my-4 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
                Registration and Health Check:
              </h3>
              <p>
                Upon arrival at a blood donation center or mobile blood drive,
                donors are registered and provided with informational materials
                about the donation process. A brief health check follows,
                including measurements of vital signs such as blood pressure,
                pulse rate, and hemoglobin levels. These assessments help
                confirm the donor's eligibility and ensure they are in good
                health before proceeding with the donation.
              </p>
            </div>
            <div>
              <h3 className="my-4 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
                Donation Procedure:
              </h3>
              <p>
                Once cleared for donation, the donor is escorted to a donation
                area where trained phlebotomists or nurses conduct the
                procedure. The donor's arm is cleansed with antiseptic, and a
                sterile needle is inserted into a vein, usually in the arm.
                Blood is drawn into a collection bag or tube, typically about
                one pint (approximately 470 milliliters) depending on the
                donation type and local regulations.
              </p>
            </div>
            <div>
              <h3 className="my-4 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
                Post-Donation Care:
              </h3>
              <p>
                After donating blood, donors are encouraged to rest for a short
                period and replenish fluids with water or juice provided by the
                donation center. Snacks may also be offered to help restore
                energy levels. Donors are advised to avoid heavy lifting or
                strenuous activity for several hours following donation to
                minimize the risk of dizziness or injury.
              </p>
            </div>
            <div>
              <h3 id="test" className="my-4 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
                Testing and Processing:
              </h3>
              <p>
                The donated blood undergoes rigorous testing and processing to
                ensure its safety and suitability for transfusion. This includes
                screening for infectious diseases such as HIV, hepatitis, and
                syphilis, as well as blood type compatibility testing. Once
                cleared, the blood is separated into its various components—red
                blood cells, plasma, and platelets—through a process called
                fractionation. These components are then stored appropriately
                until needed for transfusion.
              </p>
            </div>
            <div>
              <h3 className="my-4 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
                Distribution and Utilization:
              </h3>
              <p>
                Processed blood components are distributed to hospitals and
                healthcare facilities where they are used to treat patients with
                a wide range of medical conditions, from trauma and surgery to
                cancer and chronic illnesses. Blood products may be transfused
                whole or separated into specific components based on the
                patient's needs. Blood donations are often in high demand,
                particularly for rare blood types or during emergencies,
                highlighting the critical importance of regular donations to
                maintain adequate supply levels.
              </p>
            </div>
            <div>
              <h3 className="my-4 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
                Donor Follow-Up:
              </h3>
              <p>
                Following donation, donors may receive a thank-you message or
                certificate acknowledging their contribution. Some donation
                centers also provide updates on the impact of their donation,
                including the number of lives potentially saved or the patients
                helped. Donors are typically encouraged to donate regularly,
                with donation intervals varying depending on local regulations
                and individual health factors.
              </p>
            </div>
            {/* <div>
              <h3 className="my-4 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">
                Conclusion:
              </h3>
              <p>
                The blood donation process is a vital lifeline for patients in
                need of transfusions and medical treatments. From the initial
                screening and registration to the final distribution and
                utilization of donated blood, every step is carefully managed to
                ensure the safety, quality, and efficacy of the blood supply. By
                donating blood, individuals have the power to make a tangible
                difference in the lives of others, providing hope and healing to
                those facing health challenges. Blood donation truly exemplifies
                the spirit of altruism and compassion, uniting communities in
                the shared mission of saving lives one donation at a time.
              </p>
            </div> */}

            {/* <ol>
              <li>
                <strong>Usability testing</strong>. Does your user know how to
                exit out of screens? Can they follow your intended user journey
                and buy something from the site you’ve designed? By running a
                usability test, you’ll be able to see how users will interact
                with your design once it’s live;
              </li>
              <li>
                <strong>Involving stakeholders</strong>. Need to check if your
                GDPR consent boxes are displaying properly? Pass your prototype
                to your data protection team and they can test it for real;
              </li>
              <li>
                <strong>Impressing a client</strong>. Prototypes can help
                explain or even sell your idea by providing your client with a
                hands-on experience;
              </li>
              <li>
                <strong>Communicating your vision</strong>. By using an
                interactive medium to preview and test design elements,
                designers and developers can understand each other — and the
                project — better.
              </li>
            </ol> */}
          </article>
        </div>
      </main>
    </Guest>
  );
};

export default donationProcess;
