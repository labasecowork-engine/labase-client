export const CameraFocus = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="sm:hidden">
        <div
          className="absolute top-0 left-0 w-full bg-black/70"
          style={{ height: "calc(50vh - 125px)" }}
        ></div>

        <div
          className="absolute bottom-0 left-0 w-full bg-black/70"
          style={{ height: "calc(50vh - 125px)" }}
        ></div>

        <div
          className="absolute left-0 bg-black/70"
          style={{
            top: "calc(50vh - 125px)",
            height: "250px",
            width: "calc(50vw - 125px)",
          }}
        ></div>

        <div
          className="absolute right-0 bg-black/70"
          style={{
            top: "calc(50vh - 125px)",
            height: "250px",
            width: "calc(50vw - 125px)",
          }}
        ></div>
      </div>

      <div className="hidden sm:block">
        <div
          className="absolute top-0 left-0 w-full bg-black/70"
          style={{ height: "calc(50vh - 200px)" }}
        ></div>

        <div
          className="absolute bottom-0 left-0 w-full bg-black/70"
          style={{ height: "calc(50vh - 200px)" }}
        ></div>

        <div
          className="absolute left-0 bg-black/70"
          style={{
            top: "calc(50vh - 200px)",
            height: "400px",
            width: "calc(50vw - 200px)",
          }}
        ></div>

        <div
          className="absolute right-0 bg-black/70"
          style={{
            top: "calc(50vh - 200px)",
            height: "400px",
            width: "calc(50vw - 200px)",
          }}
        ></div>
      </div>
    </div>
  );
};
