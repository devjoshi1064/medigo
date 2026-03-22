import { getPendingDoctors, getVerifyDoctors } from "@/actions/admin";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import { VerifiedDoctors } from "./_Components/verified-doctors";
import { PendingDoctors } from "./_Components/pending-doctors";

const AdminPage = async ()  => {
   const [pendingDoctorsData,verifiedDoctorsData] = await Promise.all([
        getPendingDoctors(),
        getVerifyDoctors()
    ]);
  return (
    <>
      <TabsContent value="pending" className="border-none p-0">
        <PendingDoctors doctors= {pendingDoctorsData.doctors || []}/>
      </TabsContent>
      <TabsContent value="doctors"className="border-none p-0"> 
        <VerifiedDoctors doctors= {verifiedDoctorsData.doctors || []}/>
      </TabsContent>
    </>
  );
};

export default AdminPage;
