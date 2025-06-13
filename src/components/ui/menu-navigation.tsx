import SvgLogoBack from "./svg-logo-back";
import SvgLogoConfig from "./svg-logo-config";
import SvgLogoHome from "./svg-logo-home";
import SvgLogoProfile from "./svg-logo-profile";
import SvgLogoSubject from "./svg-logo-subject";
import SvgLogoUtn from "./svg-logo-utn";

export default function MenuNavigation() {
  return (
    <div className="h-full  p-4  ">
      <ul className=" bg-black max-w-[130px] grid grid-row-5 [&>*]:flex [&>*]:items-center [&>*]:justify-center   h-full rounded-[14px] text-white  shadow-menu">
        <li>
          <SvgLogoUtn />
        </li>
        <i></i>
        <i></i>
        <li>
          <SvgLogoHome />
        </li>
        <li>
          <SvgLogoSubject />
        </li>
        <li>
          <SvgLogoProfile />
        </li>
        <li>
          <SvgLogoConfig />
        </li>
        <i></i>
        <i></i>
        <li>
          <SvgLogoBack />
        </li>
      </ul>
    </div>
  );
}
