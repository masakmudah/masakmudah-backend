export function WelcomePage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
      <div className="bg-slate-800 shadow-md rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-slate-200 mb-4 text-center">
          Welcome to Masakmudah REST API
        </h1>
        <p className="text-lg text-slate-400 mb-6">
          Masakmudah REST API is a web service that provides access to a large
          collection of recipe.
        </p>
        <p className="text-lg text-slate-400 mb-6">
          The OpenAPI Specification for the Masakmudah API offers a detailed
          description of the API's services. It can be accessed at the path{" "}
          <code className="bg-slate-950 rounded px-2 py-1">/doc</code>.
        </p>
        <p className="text-lg text-slate-400 mb-6">
          For a more interactive experience, you can use SwaggerUI. It provides
          a user-friendly interface for exploring and testing the API. You can
          access SwaggerUI at{" "}
          <code className="bg-slate-950 rounded px-2 py-1">/ui</code>.
        </p>
        <p className="text-lg text-slate-400 mb-4">
          You can also access the following:
        </p>
        <ul className="list-disc list-inside text-lg text-slate-400 mb-6">
          <li>
            <a
              href="/doc"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              OpenAPI Specification
            </a>
          </li>
          <li>
            <a
              href="/ui"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              SwaggerUI
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
