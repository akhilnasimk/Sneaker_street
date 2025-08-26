import React, { useContext, useEffect, useMemo } from "react";
import { UserContext } from "../../AdminContext/UserC";

function UserDetails() {
    const { user, setUser } = useContext(UserContext);
    
    // Process user data to get statistics
    const userStats = useMemo(() => {
        if (!user || user.length === 0) {
            return {
                totalUsers: 0,
                adminUsers: 0,
                blockedUsers: 0,
                regularUsers: 0
            };
        }

        const stats = {
            totalUsers: user.length,
            adminUsers: user.filter(u => u.isAdmin === true).length,
            blockedUsers: user.filter(u => u.isBlock === true).length,
            regularUsers: 0
        };

        stats.regularUsers = stats.totalUsers - stats.adminUsers;

        return stats;
    }, [user]);

    // Calculate percentages for visual representation
    const calculatePercentages = () => {
        const total = userStats.totalUsers || 1; // Avoid division by zero
        return {
            adminPercentage: Math.round((userStats.adminUsers / total) * 100),
            blockedPercentage: Math.round((userStats.blockedUsers / total) * 100),
            regularPercentage: Math.round((userStats.regularUsers / total) * 100)
        };
    };

    const percentages = calculatePercentages();

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">User Statistics</h3>
                <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-xs text-purple-400">Live Data</span>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/30 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">{userStats.totalUsers}</div>
                    <div className="text-xs text-slate-400 mt-1">Total Users</div>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">{userStats.adminUsers}</div>
                    <div className="text-xs text-slate-400 mt-1">Admins</div>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-400">{userStats.blockedUsers}</div>
                    <div className="text-xs text-slate-400 mt-1">Blocked</div>
                </div>
            </div>

            {/* Visual Representation */}
            <div className="relative h-4 bg-slate-700/50 rounded-full overflow-hidden mb-6">
                <div 
                    className="absolute top-0 left-0 h-full bg-blue-500/70 transition-all duration-1000 ease-out"
                    style={{ width: `${percentages.regularPercentage}%` }}
                ></div>
                <div 
                    className="absolute top-0 h-full bg-green-500/70 transition-all duration-1000 ease-out"
                    style={{ left: `${percentages.regularPercentage}%`, width: `${percentages.adminPercentage}%` }}
                ></div>
                <div 
                    className="absolute top-0 h-full bg-amber-500/70 transition-all duration-1000 ease-out"
                    style={{ left: `${percentages.regularPercentage + percentages.adminPercentage}%`, width: `${percentages.blockedPercentage}%` }}
                ></div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm text-slate-300">Regular Users</span>
                    </div>
                    <div className="text-sm text-slate-400">
                        {userStats.regularUsers} ({percentages.regularPercentage}%)
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-slate-300">Admin Users</span>
                    </div>
                    <div className="text-sm text-slate-400">
                        {userStats.adminUsers} ({percentages.adminPercentage}%)
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                        <span className="text-sm text-slate-300">Blocked Users</span>
                    </div>
                    <div className="text-sm text-slate-400">
                        {userStats.blockedUsers} ({percentages.blockedPercentage}%)
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="mt-6 p-3 bg-slate-700/30 rounded-lg">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Active Users:</span>
                    <span className="text-green-400 font-medium">
                        {userStats.totalUsers - userStats.blockedUsers}
                    </span>
                </div>
                <div className="flex justify-between items-center text-xs mt-1">
                    <span className="text-slate-400">Admin Ratio:</span>
                    <span className="text-blue-400 font-medium">
                        {percentages.adminPercentage}%
                    </span>
                </div>
                <div className="flex justify-between items-center text-xs mt-1">
                    <span className="text-slate-400">Blocked Ratio:</span>
                    <span className="text-amber-400 font-medium">
                        {percentages.blockedPercentage}%
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;