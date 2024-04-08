import React from 'react';
import Link from 'next/link';

interface UserInfo {
    sentimentLeft: number;
    subscribed?: boolean;
  }

  const SentimentBanner: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  return userInfo.sentimentLeft >= 0 ? (
    <div className="mx-auto mt-6 w-3/5">
      <div role="alert" className="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>
          You have used {userInfo.sentimentLeft}
          {userInfo?.subscribed ? "/100" : "/5"} restaurant suggestions limit. {userInfo?.subscribed ? "" : "Upgrade your plan to have access to 100 horoscope sentiments."}
        </span>
        {userInfo?.sentimentLeft <= 5 && (
          <button className="btn btn-primary">
            <Link href="/pricing">{userInfo?.subscribed ? "Your plan will renew automatically" : "Upgrade"}</Link>
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default SentimentBanner;