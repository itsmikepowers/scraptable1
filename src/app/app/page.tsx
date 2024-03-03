"use client";

import { Fragment, useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { useRouter } from "next/navigation";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { getCheckoutUrl, getPortalUrl } from "./stripePayment";
import { getPremiumStatus } from "./getPremiumStatus";

export default function AccountPage() {
  const app = initFirebase();
  const auth = getAuth(app);

  const userName = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser ? await getPremiumStatus(app) : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);

  const upgradeToPremium = async () => {
    const priceId = "price_1MN3IPDWaiv6TkQpE7ZutdAd";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl);
    console.log("Upgrade to Premium");
  };

  const manageSubscription = async () => {
    const portalUrl = await getPortalUrl(app);
    router.push(portalUrl);
    console.log("Manage Subscription");
  };

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  const tabs = [
    { name: 'Home', content: 'Home Content' },
    { name: 'Settings', content: (
      <div className="flex flex-col gap-8">
        <div>
          <div>Signed in as {userName}</div>
          <div>{email}</div>
          <div>Subscription: {isPremium ? "Premium" : "Standard"}</div>
        </div>
        <button
          onClick={isPremium ? manageSubscription : upgradeToPremium}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPremium ? "Manage Subscription" : "Upgrade To Premium"}
        </button>
        <button
          onClick={signOut}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
    ) },
  ];

  return (
    <div className="flex h-screen ">
      <Tab.Group>
        <div className="flex flex-row w-full">
          <div className="w-1/6 bg-gray-300 p-4">
            <Tab.List className="flex flex-col p-1 space-y-1 rounded-xl">
              {tabs.map((tab) => (
                <Tab key={tab.name} className={({ selected }) =>
                  selected
                    ? 'w-full text-sm font-medium text-blue-600 rounded-lg'
                    : 'w-full text-sm leading-5 font-medium text-black rounded-lg'
                }>
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <div className="w-5/6 p-4">
            <Tab.Panels>
              {tabs.map((tab) => (
                <Tab.Panel
                  key={tab.name}
                  className="bg-white rounded-xl p-3 text-gray-600"
                >
                  {tab.content}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </div>
        </div>
      </Tab.Group>
    </div>
  );
}
