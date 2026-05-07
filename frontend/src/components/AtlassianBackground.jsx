export default function AtlassianBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        className="absolute bottom-0 left-0 w-[40vw] max-w-[600px] min-w-[300px] text-[#0052CC] opacity-10"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMinYMax meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,1000 L0,500 C200,600 400,300 700,500 C850,600 950,550 1000,500 L1000,1000 Z" fill="currentColor" />
        <path d="M0,1000 L0,700 C250,800 450,500 800,700 C900,760 950,750 1000,700 L1000,1000 Z" fill="currentColor" className="opacity-50" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-[30vw] max-w-[500px] min-w-[250px] text-[#0052CC] opacity-10"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMaxYMax meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1000,1000 L1000,300 C800,200 600,500 300,400 C150,350 50,400 0,500 L0,1000 Z" fill="currentColor" />
        <path d="M1000,1000 L1000,600 C750,500 550,800 200,600 C100,520 50,550 0,600 L0,1000 Z" fill="currentColor" className="opacity-50" />
      </svg>
    </div>
  );
}
