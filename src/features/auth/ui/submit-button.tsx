import { Button } from "@/shared/ui/button";
import React from "react";

type SubmitButtonProps = {
    children: React.ReactNode;
    isPending?: boolean;
};

export function SubmitButton({
    children,
    isPending
}: SubmitButtonProps) {
    return (
        <Button disabled={isPending} type="submit" className="w-full">
            {children}
        </Button>
    );
}