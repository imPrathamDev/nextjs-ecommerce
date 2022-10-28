import React from "react";
import Layouts from "../layouts/Layouts";
import SideMenu from "./SideMenu";

const AdminLayouts = ({ children, title }) => {
  return (
    <Layouts>
      <div className="px-8 py-10">
        <h1 className="font-BrownSugar font-normal text-4xl">{title}</h1>
      </div>
      <div className="py-8">
        <SideMenu>{children}</SideMenu>
      </div>
    </Layouts>
  );
};

export default AdminLayouts;
