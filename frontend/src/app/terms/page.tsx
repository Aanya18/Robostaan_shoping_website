export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <p className="text-sm text-gray-700">
          These Terms of Service govern your use of the MaxBot Electronics website and services.
          By using our site you agree to these terms. Please read them carefully.
        </p>

        <section>
          <h2 className="font-semibold">Use of Service</h2>
          <p className="text-sm text-gray-700">You agree to use our services in compliance with applicable laws and not to misuse the platform.</p>
        </section>

        <section>
          <h2 className="font-semibold">Accounts</h2>
          <p className="text-sm text-gray-700">You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</p>
        </section>

        <section>
          <h2 className="font-semibold">Orders and Payments</h2>
          <p className="text-sm text-gray-700">All orders are subject to acceptance and availability. Payment terms and refunds are processed per our policies.</p>
        </section>

        <section>
          <h2 className="font-semibold">Limitation of Liability</h2>
          <p className="text-sm text-gray-700">To the maximum extent permitted by law, MaxBot Electronics is not liable for indirect damages arising from use of the site.</p>
        </section>

        <section>
          <h2 className="font-semibold">Governing Law</h2>
          <p className="text-sm text-gray-700">These terms are governed by the laws of the jurisdiction in which the company operates.</p>
        </section>

        <section>
          <h2 className="font-semibold">Contact</h2>
          <p className="text-sm text-gray-700">Questions about these terms should be directed to <a className="text-primary-600" href="mailto:legal@electroshop.com">legal@electroshop.com</a>.</p>
        </section>
      </div>
    </div>
  );
}


