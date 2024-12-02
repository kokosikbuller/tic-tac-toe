import Link from "next/link";
import React from "react";

type BottomLink = {
    text: string;
    linkText: string;
    url: string;
};

export function BottomLink({
    linkText,
    text,
    url,
}: BottomLink) {
    return (
        <p className="text-sm text-primary/50">
            {text}{" "}
            <Link href={url} className="font-medium text-primary hover:underline">
                {linkText}
            </Link>
        </p>
    );
}