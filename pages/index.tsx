import PaintForm from '../components/PaintForm';
const Home = () => {
  return (
    <div className="container mx-auto px-4 max-w-3xl bg-amber-50 rounded-lg mt-14 pb-8 pt-8">
      <h1 className="text-3xl text-black font-bold p-4 text-center mb-10">
        화가 스타일로 그림 만들기&nbsp;
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
          <span className="relative text-white">with GPT-3.5</span>
        </span>
      </h1>
      <PaintForm />
    </div>
  );
};

export default Home;
