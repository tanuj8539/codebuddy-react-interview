import MultiStepForm from "../Components/MultiStepForm";

const Home = () => {
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-4 flex items-center text-4xl font-bold">
        Welcome
      </h1>

      <MultiStepForm />
    </div>
  );
};

export default Home;
