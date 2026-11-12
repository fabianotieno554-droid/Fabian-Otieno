import React, { useState } from 'react';
import {
  OFFICIAL_FACEBOOK_URL,
  OFFICIAL_FACEBOOK_HANDLE,
  OFFICIAL_FACEBOOK_MESSENGER_URL,
  OFFICIAL_FACEBOOK_PAGE_NAME,
  OFFICIAL_TILL_NUMBER,
  OFFICIAL_SUPPORT_PHONE,
  FACEBOOK_POSTS,
} from '../data/toursData';
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  ExternalLink,
  ShieldCheck,
  Check,
  Compass,
  Users,
  Send,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FacebookCommunitySectionProps {
  onOpenBooking: () => void;
}

export const FacebookCommunitySection: React.FC<FacebookCommunitySectionProps> = ({
  onOpenBooking,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(24850);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>(
    FACEBOOK_POSTS.reduce((acc, p) => ({ ...acc, [p.id]: p.likesCount }), {})
  );
  const [copiedSharePostId, setCopiedSharePostId] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleFollowToggle = () => {
    setIsFollowing((prev) => {
      const next = !prev;
      setFollowersCount((count) => (next ? count + 1 : count - 1));
      return next;
    });
  };

  const handleLikePost = (postId: string) => {
    setLikedPosts((prev) => {
      const isLiked = !!prev[postId];
      const updated = !isLiked;
      setLikesCountMap((counts) => ({
        ...counts,
        [postId]: (counts[postId] || 0) + (updated ? 1 : -1),
      }));
      return { ...prev, [postId]: updated };
    });
  };

  const handleShareFacebookPage = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href || OFFICIAL_FACEBOOK_URL
    )}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleSharePost = (postId: string) => {
    navigator.clipboard.writeText(
      `${OFFICIAL_FACEBOOK_URL} - Book with Till ${OFFICIAL_TILL_NUMBER} or call ${OFFICIAL_SUPPORT_PHONE}`
    );
    setCopiedSharePostId(postId);
    setTimeout(() => setCopiedSharePostId(null), 2500);
  };

  return (
    <section id="facebook-community" className="py-20 bg-slate-100/70 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-2">
            <span>{t.facebook.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>Facebook Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.facebook.title}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            {t.facebook.subtitle}
          </p>
        </div>

        {/* Facebook Page Profile Hub Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-12">
          {/* Cover Photo */}
          <div className="relative h-48 sm:h-64 bg-slate-900 overflow-hidden">
            <img
              src="/src/assets/images/hero_safari_adventure_1792414486160.jpg"
              alt="SafariQuest Facebook Cover"
              className="w-full h-full object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
            
            <div className="absolute top-4 right-4 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/10 flex items-center gap-1.5">
              <span>{t.facebook.verifiedPage}</span>
            </div>
          </div>

          {/* Profile Identity Bar */}
          <div className="p-6 sm:p-8 pt-0 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-14 sm:-mt-16 mb-6">
              {/* Avatar & Details */}
              <div className="flex items-end gap-4 sm:gap-6">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-emerald-800 p-1 border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden shrink-0 flex items-center justify-center text-white">
                  <Compass className="w-14 h-14 text-emerald-300" />
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {OFFICIAL_FACEBOOK_PAGE_NAME}
                    </h3>
                    {/* Facebook Blue Verified Badge SVG */}
                    <span title="Verified Official Page" className="inline-flex text-blue-600 dark:text-blue-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {OFFICIAL_FACEBOOK_HANDLE} · Tour Agency & Travel Operator
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-2 flex-wrap">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {followersCount.toLocaleString()} {t.facebook.followers}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{t.facebook.responseRate}</span>
                    <span aria-hidden="true">·</span>
                    <span>Till {OFFICIAL_TILL_NUMBER}</span>
                    <span aria-hidden="true">·</span>
                    <span>{OFFICIAL_SUPPORT_PHONE}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {/* Follow Button */}
                <button
                  type="button"
                  onClick={handleFollowToggle}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isFollowing
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      : 'bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-xs'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.facebook.following}</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4" />
                      <span>{t.facebook.followPage}</span>
                    </>
                  )}
                </button>

                {/* Direct Link to Facebook Page */}
                <a
                  href={OFFICIAL_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>{t.facebook.openFacebook}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                </a>

                {/* Facebook Messenger Chat */}
                <a
                  href={OFFICIAL_FACEBOOK_MESSENGER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.facebook.sendMessage}</span>
                </a>

                {/* Share Page to Timeline */}
                <button
                  type="button"
                  onClick={handleShareFacebookPage}
                  className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                  title="Share to Facebook"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{t.facebook.share}</span>
                </button>
              </div>
            </div>

            {/* Official Announcement Strip */}
            <div className="bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-950 dark:text-blue-200">
                    {t.facebook.officialNotice}: {OFFICIAL_FACEBOOK_HANDLE}
                  </div>
                  <div className="text-xs text-blue-800 dark:text-blue-300">
                    {t.facebook.noticeDesc}
                  </div>
                </div>
              </div>

              <a
                href={OFFICIAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 whitespace-nowrap flex items-center gap-1 self-end sm:self-auto"
              >
                <span>facebook.com/SafariQuestToursKe</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Live Facebook Post Previews Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.facebook.latestPosts}
            </h3>
            <a
              href={OFFICIAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
            >
              <span>{t.facebook.viewAll}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FACEBOOK_POSTS.map((post) => {
              const isLiked = !!likedPosts[post.id];
              const likes = likesCountMap[post.id] || post.likesCount;
              const isCopied = copiedSharePostId === post.id;

              return (
                <div
                  key={post.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Post Author Bar */}
                    <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-white shrink-0">
                          <Compass className="w-5 h-5 text-emerald-300" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                              {post.author}
                            </h4>
                            <svg className="w-3.5 h-3.5 fill-blue-600 dark:fill-blue-400 shrink-0" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          </div>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 block">{post.timestamp}</span>
                        </div>
                      </div>

                      {post.pinned && (
                        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full">
                          Pinned
                        </span>
                      )}
                    </div>

                    {/* Post Content */}
                    <div className="p-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
                      <p className="line-clamp-4">{post.content}</p>
                    </div>

                    {/* Attached Image if present */}
                    {post.image && (
                      <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.content.slice(0, 50)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Post Engagements & Actions */}
                  <div className="p-4 pt-3 bg-white dark:bg-slate-900">
                    {/* Stats counts */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-medium">
                        <ThumbsUp className="w-3 h-3 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
                        {likes} {t.facebook.likes}
                      </span>
                      <div className="flex items-center gap-2">
                        <span>{post.commentsCount} {t.facebook.comments}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.sharesCount} {t.facebook.shares}</span>
                      </div>
                    </div>

                    {/* Interactive Like, Comment, Share buttons */}
                    <div className="grid grid-cols-3 gap-1 pt-2">
                      <button
                        type="button"
                        onClick={() => handleLikePost(post.id)}
                        className={`py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                          isLiked
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-blue-600 dark:fill-blue-400' : ''}`} />
                        <span>{isLiked ? t.facebook.liked : t.facebook.like}</span>
                      </button>

                      <a
                        href={OFFICIAL_FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{t.facebook.comment}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleSharePost(post.id)}
                        className="py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Copied' : t.facebook.share}</span>
                      </button>
                    </div>

                    {/* Quick reservation action */}
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-800 dark:text-emerald-400 font-bold">
                        Till: {OFFICIAL_TILL_NUMBER}
                      </span>
                      <button
                        type="button"
                        onClick={onOpenBooking}
                        className="text-[11px] font-bold text-slate-900 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer"
                      >
                        {t.facebook.bookTrip} &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
