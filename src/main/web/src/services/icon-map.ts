import { IconType } from "react-icons";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  MdAddCircleOutline,
  MdDeleteOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";

export function IconMap(key: string) {
  const iconMap: { [key: string]: IconType } = {
    delete: MdDeleteOutline,
    remove: MdRemoveCircleOutline,
    add: MdAddCircleOutline,
    detail: HiDotsHorizontal,
  };

  return iconMap[key];
}
