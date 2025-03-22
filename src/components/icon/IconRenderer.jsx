import React from "react";
import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaUserCircle,
  FaBars,
  FaUser,
  FaHeart,
  FaUserPlus,
  FaSearch, FaTimes,
  FaEnvelope, FaFacebook, FaTwitter, FaLinkedin,
} from "react-icons/fa";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { HashLoader } from "react-spinners";

import { GoStarFill } from "react-icons/go";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const iconMap = {
  ChartPieIcon: ChartPieIcon,
  CursorArrowRaysIcon: CursorArrowRaysIcon,
  FingerPrintIcon: FingerPrintIcon,
  SquaresPlusIcon: SquaresPlusIcon,
  ArrowPathIcon: ArrowPathIcon,

  FaChevronLeft: FaChevronLeft,
  FaChevronRight: FaChevronRight,
  FaFilter: FaFilter,
  FaUserCircle: FaUserCircle,
  FaBars: FaBars,
  FaUser: FaUser,
  FaUserPlus: FaUserPlus,
  FaHeart: FaHeart,
  FaSearch: FaSearch,
  FaTimes: FaTimes,
  FaEnvelope: FaEnvelope,
  FaFacebook: FaFacebook,
  FaTwitter: FaTwitter,
  FaLinkedin: FaLinkedin,

  HiOutlineLogin: HiOutlineLogin,
  HiOutlineLogout: HiOutlineLogout,

  GoStarFill: GoStarFill,
  GrFormPrevious: GrFormPrevious,
  GrFormNext: GrFormNext,

  HashLoader: HashLoader,
};

export default function IconRenderer({ iconName, className, ...props }) {
  const IconComponent = iconMap[iconName];
  return IconComponent ? (
    <IconComponent className={className} {...props} />
  ) : (
    <span className={className}>{iconName}</span>
  );
}
