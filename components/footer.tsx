import {cn} from "@/lib/utils";

export default function Footer() {
  return (
    <footer
      className={cn(
        "border-t bg-background",
        "mt-4 border-t text-center text-sm text-muted-foreground"
      )}>
      <p className="my-3">© {new Date().getFullYear()} ShopCatalog. All rights reserved.</p>
    </footer>
  );
}
