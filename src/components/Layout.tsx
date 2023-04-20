export type Layout = {
  children: JSX.Element | JSX.Element[];
};

export const Layout = ({ children }: Layout) => (
  <div className="layout">{children}</div>
);
