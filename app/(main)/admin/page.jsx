import { TabsContent } from "@/components/ui/tabs";
import { getPendingDoctors, getVerifyDoctors,getPendingPayouts } from "@/actions/admin";
import React from "react";
import { VerifiedDoctors } from "./_Components/verified-doctors";
import { PendingDoctors } from "./_Components/pending-doctors";
import { PendingPayouts } from "./_Components/pending-payouts";


const AdminPage = async ()  => {
   const [pendingDoctorsData,verifiedDoctorsData,pendingPayoutsData] = await Promise.all([
        getPendingDoctors(),
        getVerifyDoctors(),
        getPendingPayouts(),
    ]);
  return (
    <>
      <TabsContent value="pending" className="border-none p-0">
        <PendingDoctors doctors= {pendingDoctorsData.doctors || []}/>
      </TabsContent>
      <TabsContent value="doctors"className="border-none p-0"> 
        <VerifiedDoctors doctors= {verifiedDoctorsData.doctors || []}/>
      </TabsContent>
      <TabsContent value="payouts" className="border-none p-0">
        <PendingPayouts payouts={pendingPayoutsData.payouts || []} />
      </TabsContent>
    </>
  );
};

export default AdminPage;
