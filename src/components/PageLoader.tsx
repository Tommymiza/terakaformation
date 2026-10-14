import { CircularProgress } from "@mui/material";

export default function PageLoader() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <CircularProgress size={56} />
    </div>
  );
}
