import React, { useRef, useEffect, useState, useContext, useMemo } from "react";
import Chart from "chart.js/auto";
import { OrderContext } from "../../AdminContext/OrderC";

export default function DailySalesChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { Order } = useContext(OrderContext);
  
  // Get available months from orders
  const availableMonths = useMemo(() => {
    if (!Order || Order.length === 0) return [];
    
    // Extract unique months from orders
    const months = [...new Set(Order.map(order => {
      try {
        let orderDate;
        if (order.orderdate) {
          if (order.orderdate.includes('-') || order.orderdate.includes('/')) {
            orderDate = new Date(order.orderdate);
          } else {
            orderDate = new Date(parseInt(order.orderdate));
          }
        } else {
          orderDate = new Date();
        }
        
        // Format as YYYY-MM
        return `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
      } catch (error) {
        console.error("Error parsing date:", error, order);
        return new Date().toISOString().slice(0, 7); // YYYY-MM format
      }
    }))].sort();
    
    return months;
  }, [Order]);

  // Set default selected month to most recent month
  const [selectedMonth, setSelectedMonth] = useState(
    availableMonths.length > 0 
      ? availableMonths[availableMonths.length - 1] 
      : new Date().toISOString().slice(0, 7)
  );

  // Process order data to get daily sales for the selected month
  const processOrderData = useMemo(() => {
    if (!Order || Order.length === 0) {
      return { labels: [], orders: [] };
    }

    // Get year and month from selectedMonth
    const [year, month] = selectedMonth.split('-').map(Number);
    
    // Get number of days in the selected month
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // Initialize daily orders array
    const dailyOrders = Array(daysInMonth).fill(0);
    
    // Filter and process orders for the selected month
    Order.forEach(order => {
      try {
        let orderDate;
        if (order.orderdate) {
          if (order.orderdate.includes('-') || order.orderdate.includes('/')) {
            orderDate = new Date(order.orderdate);
          } else {
            orderDate = new Date(parseInt(order.orderdate));
          }
        } else {
          return; // Skip if no order date
        }
        
        // Check if order is in the selected month
        const orderYear = orderDate.getFullYear();
        const orderMonth = orderDate.getMonth() + 1; // Months are 0-indexed
        
        if (orderYear === year && orderMonth === month) {
          const day = orderDate.getDate();
          dailyOrders[day - 1] += 1; // Increment count for that day
        }
      } catch (error) {
        console.error("Error processing order:", error);
      }
    });

    // Generate day labels (1 to daysInMonth)
    const dayLabels = Array.from({ length: daysInMonth }, (_, i) => 
      `${i + 1}${getDaySuffix(i + 1)}`
    );

    return {
      labels: dayLabels,
      orders: dailyOrders
    };
  }, [Order, selectedMonth]);

  // Helper function to get day suffix (st, nd, rd, th)
  function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  // Calculate total orders and peak day
  const totalOrders = processOrderData.orders.reduce((sum, orders) => sum + orders, 0);
  const maxOrders = Math.max(...processOrderData.orders);
  const peakDayIndex = processOrderData.orders.indexOf(maxOrders);
  const peakDay = processOrderData.labels[peakDayIndex] || 'N/A';
  const avgPerDay = totalOrders > 0 ? Math.round(totalOrders / processOrderData.orders.length) : 0;

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Don't render chart if no data
    if (totalOrders === 0) {
      return;
    }

    const ctx = chartRef.current.getContext("2d");
    
    // Create gradient for the line
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(139, 92, 246, 0.6)");
    gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.3)");
    gradient.addColorStop(1, "rgba(139, 92, 246, 0.1)");

    // Create gradient for the area under the line
    const areaGradient = ctx.createLinearGradient(0, 0, 0, 400);
    areaGradient.addColorStop(0, "rgba(124, 58, 237, 0.4)");
    areaGradient.addColorStop(1, "rgba(124, 58, 237, 0.0)");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: processOrderData.labels,
        datasets: [
          {
            label: "Orders Placed",
            data: processOrderData.orders,
            backgroundColor: areaGradient,
            borderColor: "rgba(167, 139, 250, 1)",
            pointBackgroundColor: "rgba(139, 92, 246, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(139, 92, 246, 1)",
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: "easeOutQuart"
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: "rgba(30, 41, 59, 0.95)",
            titleColor: "#f1f5f9",
            bodyColor: "#e2e8f0",
            borderColor: "rgba(139, 92, 246, 0.5)",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return `Orders: ${context.parsed.y}`;
              },
              title: function(context) {
                return `Day: ${context[0].label}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(51, 65, 85, 0.5)",
            },
            ticks: {
              color: "#cbd5e1",
              font: {
                size: 11,
              },
              callback: function(value) {
                return value;
              }
            },
            title: {
              display: true,
              text: 'Orders Placed',
              color: '#94a3b8',
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          },
          x: {
            grid: {
              color: "rgba(51, 65, 85, 0.5)",
            },
            ticks: {
              color: "#cbd5e1",
              font: {
                size: 11,
              },
              maxRotation: 45,
              minRotation: 45
            },
            title: {
              display: true,
              text: 'Day of Month',
              color: '#94a3b8',
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedMonth, processOrderData, totalOrders]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Format month for display
  function formatMonth(monthString) {
    const [year, month] = monthString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  }

  // Generate month options for the dropdown
  const monthOptions = availableMonths.map(month => (
    <option key={month} value={month}>
      {formatMonth(month)}
    </option>
  ));

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Monthly Orders Performance</h3>
          <p className="text-sm text-slate-400">Orders placed by day in {formatMonth(selectedMonth)}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              value={selectedMonth} 
              onChange={handleMonthChange}
              className="bg-slate-700/50 border border-slate-600/50 text-slate-200 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2 pr-8 appearance-none cursor-pointer"
            >
              {monthOptions.length > 0 ? monthOptions : (
                <option value="">No months available</option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-xs text-purple-400">Live</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-64 relative">
        {totalOrders === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-slate-400 text-sm">No orders data for selected month</p>
              <p className="text-slate-500 text-xs mt-1">Try selecting a different month</p>
            </div>
          </div>
        ) : (
          <>
            <canvas ref={chartRef} />
            {/* Peak day indicator */}
            {maxOrders > 0 && (
              <div className="absolute top-2 right-2 bg-purple-600/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                <span className="text-xs text-purple-300 font-medium">Peak: {peakDay} ({maxOrders} orders)</span>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-700/30 p-3 rounded-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            <span className="text-xs text-slate-300">Total Orders</span>
          </div>
          <p className="text-lg font-bold text-white mt-1">{totalOrders} orders</p>
        </div>
        
        <div className="bg-slate-700/30 p-3 rounded-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
            <span className="text-xs text-slate-300">Avg/Day</span>
          </div>
          <p className="text-lg font-bold text-white mt-1">{avgPerDay} orders</p>
        </div>
        
        <div className="bg-slate-700/30 p-3 rounded-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-amber-400 rounded-full mr-2"></div>
            <span className="text-xs text-slate-300">Peak Day</span>
          </div>
          <p className="text-lg font-bold text-white mt-1">{peakDay}</p>
        </div>
      </div>
    </div>
  );
}