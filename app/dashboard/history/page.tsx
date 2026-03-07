"use client";

import { useEffect, useState } from "react";
import { getDMHistory } from "@/features/dm/api";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function HistoryPage() {
  const [dms, setDms] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDMs();
  }, []);

  const fetchDMs = async () => {
    try {
      setLoading(true);
      const response = await getDMHistory();
      setDms(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Generated DMs</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {loading && (
          <div className="flex gap-2 items-center">
            Loading
            <Spinner />
          </div>
        )}
        {dms.map((dm: any) => (
          <div key={dm.id} className="border rounded-lg p-4 space-y-2">
            <p className="text-xs text-muted-foreground">
              {dm.platform} • {dm.tone}
            </p>

            <p className="text-sm">{dm.generatedDM}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
