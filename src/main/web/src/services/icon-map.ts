import { IconType } from "react-icons";
import { MdAddCircleOutline, MdDeleteOutline } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";

export function IconMap(key: string) {
  const iconMap: { [key: string]: IconType } = {
    delete: MdDeleteOutline,
    add: MdAddCircleOutline,
    detail: HiDotsHorizontal,
  };

  return iconMap[key];
}
