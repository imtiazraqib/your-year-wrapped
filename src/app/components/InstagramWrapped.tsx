"use client";
import React, { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Camera,
  MapPin,
  Clock,
  Sparkles,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Instagram API helper (in a real app, you'd use the official Instagram Basic Display API)
const InstagramAPI = {
  async fetchUserData(accessToken: string) {
    try {
      // This is where you'd make actual API calls to Instagram
      // For demo purposes, returning mock data
      return {
        posts: [
          {
            id: 1,
            imageUrl: "/api/placeholder/400/400",
            likes: 1234,
            caption: "Best day ever! 🌟",
            location: "Paris",
            timestamp: "2024-03-15",
          },
          {
            id: 2,
            imageUrl: "/api/placeholder/400/400",
            likes: 1089,
            caption: "Beach vibes 🏖️",
            location: "Bali",
            timestamp: "2024-02-20",
          },
          {
            id: 3,
            imageUrl: "/api/placeholder/400/400",
            likes: 987,
            caption: "Family time ❤️",
            location: "Home",
            timestamp: "2024-01-10",
          },
          {
            id: 4,
            imageUrl: "/api/placeholder/400/400",
            likes: 856,
            caption: "New adventures 🌎",
            location: "Tokyo",
            timestamp: "2024-04-05",
          },
          {
            id: 5,
            imageUrl: "/api/placeholder/400/400",
            likes: 743,
            caption: "Weekend mood 😎",
            location: "New York",
            timestamp: "2024-05-01",
          },
        ],
        followers: [
          { username: "@bestfriend", interactions: 156, lastInteraction: "2024-05-01" },
          { username: "@sister", interactions: 142, lastInteraction: "2024-04-28" },
          { username: "@coworker", interactions: 98, lastInteraction: "2024-04-25" },
          { username: "@college_buddy", interactions: 87, lastInteraction: "2024-04-20" },
          { username: "@neighbor", interactions: 76, lastInteraction: "2024-04-15" },
        ],
        statistics: {
          totalPosts: 142,
          totalLikes: 15234,
          totalComments: 2567,
          averageLikes: 107,
          mostActiveMonth: "March",
          topFilter: "Clarendon",
          topPostingTime: "6:00 PM",
          topPostingDay: "Saturday",
        },
      };
    } catch (error) {
      console.error("Error fetching Instagram data:", error);
      throw error;
    }
  },
};

const InstagramWrapped = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await InstagramAPI.fetchUserData("dummy-token");
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gradient-to-br from-purple-900 to-pink-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-200"></div>
      </div>
    );
  }

  const slides = [
    {
      title: "Your 2024 Instagram Wrapped",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center h-full space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
            Your Year on Instagram
          </h1>
          <p className="text-xl text-gray-300">Let's revisit your best moments</p>
          <div className="mt-8 flex items-center space-x-4">
            <Camera className="text-pink-400" size={24} />
            <span className="text-gray-300">{userData.statistics.totalPosts} posts shared</span>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Your Impact",
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Your Instagram Impact</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-800/50 p-4 rounded-lg">
              <Heart className="text-pink-400 mb-2" size={24} />
              <p className="text-2xl font-bold text-white">{userData.statistics.totalLikes.toLocaleString()}</p>
              <p className="text-gray-300">Total Likes</p>
            </div>
            <div className="bg-purple-800/50 p-4 rounded-lg">
              <Users className="text-purple-400 mb-2" size={24} />
              <p className="text-2xl font-bold text-white">{userData.statistics.totalComments.toLocaleString()}</p>
              <p className="text-gray-300">Comments</p>
            </div>
            <div className="bg-purple-800/50 p-4 rounded-lg">
              <Clock className="text-blue-400 mb-2" size={24} />
              <p className="text-lg font-bold text-white">{userData.statistics.topPostingTime}</p>
              <p className="text-gray-300">Prime Posting Time</p>
            </div>
            <div className="bg-purple-800/50 p-4 rounded-lg">
              <Calendar className="text-green-400 mb-2" size={24} />
              <p className="text-lg font-bold text-white">{userData.statistics.topPostingDay}</p>
              <p className="text-gray-300">Favorite Day to Post</p>
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Top Posts",
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Your Most-Loved Posts</h2>
          <div className="grid gap-4">
            {userData.posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 bg-purple-800/50 p-4 rounded-lg">
                <span className="text-xl font-bold text-purple-400 w-8">{index + 1}</span>
                <img src={post.imageUrl} alt={`Post ${index + 1}`} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm text-gray-300 truncate">{post.caption}</p>
                  <div className="flex items-center space-x-2 text-pink-400">
                    <Heart size={16} />
                    <span>{post.likes.toLocaleString()} likes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
                    <MapPin size={14} />
                    <span>{post.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
    },
    {
      title: "Your Community",
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Your Biggest Supporters</h2>
          <div className="grid gap-4">
            {userData.followers.map((follower, index) => (
              <motion.div
                key={follower.username}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 bg-purple-800/50 p-4 rounded-lg">
                <span className="text-xl font-bold text-purple-400 w-8">{index + 1}</span>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{follower.username}</p>
                  <p className="text-sm text-gray-300">{follower.interactions} interactions</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
    },
    {
      title: "Posting Habits",
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Your Instagram Style</h2>
          <div className="grid gap-4">
            <div className="bg-purple-800/50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="text-yellow-400" size={24} />
                <h3 className="text-xl font-bold text-white">Favorite Filter</h3>
              </div>
              <p className="text-2xl font-bold text-purple-400">{userData.statistics.topFilter}</p>
            </div>
            <div className="bg-purple-800/50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="text-green-400" size={24} />
                <h3 className="text-xl font-bold text-white">Most Active Month</h3>
              </div>
              <p className="text-2xl font-bold text-purple-400">{userData.statistics.mostActiveMonth}</p>
            </div>
            <div className="bg-purple-800/50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="text-pink-400" size={24} />
                <h3 className="text-xl font-bold text-white">Average Likes</h3>
              </div>
              <p className="text-2xl font-bold text-purple-400">{userData.statistics.averageLikes} per post</p>
            </div>
          </div>
        </motion.div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-[95vw] mx-auto h-[95vh] bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl shadow-lg overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Progress bar */}
          <div className="flex px-4 pt-4 space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index <= currentSlide ? "bg-purple-400" : "bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">{slides[currentSlide].content}</AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="p-4 flex justify-between">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-2 rounded-full transition-colors ${
                currentSlide === 0 ? "text-gray-600" : "text-purple-400 hover:bg-purple-800"
              }`}>
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`p-2 rounded-full transition-colors ${
                currentSlide === slides.length - 1 ? "text-gray-600" : "text-purple-400 hover:bg-purple-800"
              }`}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramWrapped;
