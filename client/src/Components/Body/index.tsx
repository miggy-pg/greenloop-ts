interface BodyProps {
  children: React.ReactNode;
  bodyClass: HTMLDivElement;
  pageId: string;
}

const Body = ({ children, bodyClass, pageId }: BodyProps) => {
  return (
    <div
      className={`w-full h-full overflow-hidden ${bodyClass}`}
      id={`${pageId}`}
    >
      {children}
    </div>
  );
};

export default Body;
