import { ComponentProps } from "react";
import { cn } from "../../../app/utils/cn";

interface ModalFormProps extends ComponentProps<"form"> {}
export function ModalForm({ ...rest }: ModalFormProps) {
  return <form className={cn("flex w-full flex-col gap-3")} {...rest} />;
}
