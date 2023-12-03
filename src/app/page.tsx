export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex gap-16 p-8 w-full max-w-6xl">
        <div>search</div>
        <div>list</div>
        <div className="grow flex flex-col items-center">
          <div>details</div>
        </div>
      </div>
    </div>
  );
}
