interface BodyProps {
  children: React.ReactNode;
  bodyClass: string;
  pageId: string;
}

function Body({ children, bodyClass, pageId }: BodyProps) {
  return (
    <div
      className={`w-full h-full overflow-hidden ${bodyClass}`}
      id={`${pageId}`}
    >
      {children}
    </div>
  );
}

export default Body;
