"use client";
import { useState } from "react";
import { ThumbsUp, MessageSquare, Share2, Sparkles, Award } from "lucide-react";
import { Reveal, SectionHeading } from "../home/shared";
import styles from "./ecosystem.module.css";

const initialPosts = [
  {
    id: 1,
    author: "Loay Ali",
    role: "Co-founder & CTO @ StarHub",
    avatar: "LA",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
    type: "Milestone",
    typeBg: "rgba(20, 184, 166, 0.1)",
    typeColor: "#0f766e",
    content: "Excited to share that we just partnered with 8 additional seed funds! Startups on StarHub can now match and share compliance-ready data vaults instantly with active check-writers.",
    likes: 42,
    comments: 8,
    hasLiked: false,
  },
  {
    id: 2,
    author: "Sarah Jenkins",
    role: "Principal @ Aura Capital",
    avatar: "SJ",
    avatarBg: "linear-gradient(135deg, #14b8a6, #5eead4)",
    type: "Thesis Update",
    typeBg: "rgba(94, 234, 212, 0.12)",
    typeColor: "#0d9488",
    content: "We're actively looking to deploy seed capital ($500k-$1.5M tickets) into zero-knowledge security and DevOps automation startups. Direct message us if your StarHub compatibility score exceeds 90%!",
    likes: 28,
    comments: 5,
    hasLiked: false,
  },
  {
    id: 3,
    author: "Marc Werner",
    role: "Head of Open Innovation @ Siemens",
    avatar: "MW",
    avatarBg: "linear-gradient(135deg, #dc3545, #be123c)",
    type: "Challenge Live",
    typeBg: "rgba(244, 63, 94, 0.08)",
    typeColor: "#be123c",
    content: "Our Urban Smart Grid Challenge is officially live in the StarHub Marketplace! We have allocated €150k in cash prize and pilot budget for startups building distributed power metering software.",
    likes: 56,
    comments: 14,
    hasLiked: false,
  },
  {
    id: 4,
    author: "Elena Rostova",
    role: "Co-founder @ GreenGrid",
    avatar: "ER",
    avatarBg: "linear-gradient(135deg, #22c55e, #16a34a)",
    type: "Success Story",
    typeBg: "rgba(34, 197, 94, 0.08)",
    typeColor: "#16a34a",
    content: "Unbelievable efficiency: matched with Barclays Labs through StarHub's AI Matchmaker, pitched our tracking dashboard, and closed a paid corporate pilot agreement in exactly 11 days.",
    likes: 89,
    comments: 11,
    hasLiked: false,
  },
];

export default function CommunityFeed() {
  const [posts, setPosts] = useState(initialPosts);

  const handleLike = (id: number) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            likes: p.hasLiked ? p.likes - 1 : p.likes + 1,
            hasLiked: !p.hasLiked,
          };
        }
        return p;
      })
    );
  };

  return (
    <section className={`${styles.section} ${styles.sectionPad} ${styles.sectionAlt}`}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading
            label="Ecosystem Social Feed"
            title={
              <>
                Network <span className="text-teal-500">Updates & Broadcasts</span>
              </>
            }
            sub="See what verified startups, investment associates, and enterprise innovation heads are sharing."
          />
        </Reveal>

        <div className={styles.feedLayout}>
          {posts.map((post, idx) => (
            <Reveal key={post.id} delay={idx * 80}>
              <div className={styles.feedPost}>
                {/* Author Info */}
                <div className={styles.feedAuthorRow}>
                  <div
                    className={styles.feedAvatar}
                    style={{ background: post.avatarBg }}
                  >
                    {post.avatar}
                  </div>
                  <div>
                    <div className={styles.feedAuthorName}>{post.author}</div>
                    <div className={styles.feedAuthorRole}>{post.role}</div>
                  </div>
                  <div
                    className={styles.feedTypeBadge}
                    style={{ backgroundColor: post.typeBg, color: post.typeColor }}
                  >
                    <Sparkles size={9} style={{ display: "inline-block", marginRight: "3px" }} />
                    {post.type}
                  </div>
                </div>

                {/* Content */}
                <p className={styles.feedContent}>{post.content}</p>

                {/* Actions */}
                <div className={styles.feedActions}>
                  <button
                    className={styles.feedAction}
                    onClick={() => handleLike(post.id)}
                    style={{ color: post.hasLiked ? "var(--c-primary)" : "" }}
                  >
                    <ThumbsUp size={14} fill={post.hasLiked ? "var(--c-primary)" : "none"} />
                    <span>{post.likes}</span>
                  </button>
                  <button className={styles.feedAction}>
                    <MessageSquare size={14} />
                    <span>{post.comments} Comments</span>
                  </button>
                  <button className={styles.feedAction}>
                    <Share2 size={14} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
