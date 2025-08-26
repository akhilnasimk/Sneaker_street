import React, { useRef, useEffect, useContext, useMemo } from "react";
import Chart from "chart.js/auto";
import { OrderContext } from "../../AdminContext/OrderC";

export default function OrderStatusChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { Order } = useContext(OrderContext);

  // Process order data to get status counts
  const statusData = useMemo(() => {
    if (!Order || Order.length === 0) {
      return {
        pending: 0,
        processing: 0,
        delivered: 0,
        cancelled: 0
      };
    }

    const statusCounts = {
      pending: 0,
      processing: 0,
      delivered: 0,
      cancelled: 0
    };

    Order.forEach(order => {
      const status = order.status ? order.status.toLowerCase() : 'pending';
      
      if (status.includes('pending')) {
        statusCounts.pending++;
      } else if (status.includes('process')) {
        statusCounts.processing++;
      } else if (status.includes('deliver')) {
        statusCounts.delivered++;
      } else if (status.includes('cancel')) {
        statusCounts.cancelled++;
      } else {
        // Default to pending for unknown statuses
        statusCounts.pending++;
      }
    });

    return statusCounts;
  }, [Order]);

  // Format data for chart
  const chartLabels = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
  const chartValues = [
    statusData.pending,
    statusData.processing,
    statusData.delivered,
    statusData.cancelled
  ];

  const totalOrders = useMemo(() => {
    return Object.values(statusData).reduce((sum, count) => sum + count, 0);
  }, [statusData]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Don't render chart if no data
    if (totalOrders === 0) {
      return;
    }

    const ctx = chartRef.current.getContext("2d");
    
    // Create gradient effects for each segment
    const createGradient = (color1, color2) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      return gradient;
    };

    const gradients = {
      Delivered: createGradient("rgba(72, 187, 120, 0.8)", "rgba(56, 161, 105, 0.6)"),
      Processing: createGradient("rgba(96, 165, 250, 0.8)", "rgba(66, 138, 248, 0.6)"),
      Pending: createGradient("rgba(245, 158, 11, 0.8)", "rgba(245, 158, 11, 0.6)"),
      Cancelled: createGradient("rgba(239, 68, 68, 0.8)", "rgba(239, 68, 68, 0.6)")
    };

    const hoverGradients = {
      Delivered: createGradient("rgba(72, 187, 120, 1)", "rgba(56, 161, 105, 0.8)"),
      Processing: createGradient("rgba(96, 165, 250, 1)", "rgba(66, 138, 248, 0.8)"),
      Pending: createGradient("rgba(245, 158, 11, 1)", "rgba(245, 158, 11, 0.8)"),
      Cancelled: createGradient("rgba(239, 68, 68, 1)", "rgba(239, 68, 68, 0.8)")
    };

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: chartLabels,
        datasets: [
          {
            data: chartValues,
            backgroundColor: [
              gradients.Pending,
              gradients.Processing,
              gradients.Delivered,
              gradients.Cancelled
            ],
            hoverBackgroundColor: [
              hoverGradients.Pending,
              hoverGradients.Processing,
              hoverGradients.Delivered,
              hoverGradients.Cancelled
            ],
            borderColor: "rgba(30, 41, 59, 0.5)",
            borderWidth: 2,
            hoverBorderColor: "rgba(255, 255, 255, 0.3)",
            hoverBorderWidth: 2,
            borderRadius: 4,
            hoverOffset: 12
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 2000,
          easing: "easeOutQuart"
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#e2e8f0",
              font: {
                size: 11,
                family: "'Inter', sans-serif"
              },
              padding: 15,
              usePointStyle: true,
              pointStyle: "circle"
            }
          },
          tooltip: {
            backgroundColor: "rgba(30, 41, 59, 0.95)",
            titleColor: "#f1f5f9",
            bodyColor: "#e2e8f0",
            borderColor: "rgba(168, 85, 247, 0.3)",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [statusData, totalOrders]);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Order Status Distribution</h3>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
          <span className="text-xs text-purple-400">Live Update</span>
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
              <p className="text-slate-400 text-sm">No orders data available</p>
            </div>
          </div>
        ) : (
          <>
            <canvas ref={chartRef} />
            
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">
                {totalOrders}
              </span>
              <span className="text-xs text-slate-400">Total Orders</span>
            </div>
          </>
        )}
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {chartLabels.map((status, index) => {
          const count = chartValues[index];
          const percentage = totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0;
          
          let statusColor;
          switch(status.toLowerCase()) {
            case 'delivered': statusColor = 'text-green-400'; break;
            case 'processing': statusColor = 'text-blue-400'; break;
            case 'pending': statusColor = 'text-amber-400'; break;
            case 'cancelled': statusColor = 'text-red-400'; break;
            default: statusColor = 'text-slate-400';
          }
          
          return (
            <div key={status} className="bg-slate-700/30 p-2 rounded-lg flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                status.toLowerCase() === 'delivered' ? 'bg-green-500' :
                status.toLowerCase() === 'processing' ? 'bg-blue-500' :
                status.toLowerCase() === 'pending' ? 'bg-amber-500' : 'bg-red-500'
              }`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300">{status}</span>
                  <span className="text-xs font-medium text-white">{count}</span>
                </div>
                <div className="w-full bg-slate-600/50 rounded-full h-1.5 mt-1">
                  <div 
                    className={`h-1.5 rounded-full ${
                      status.toLowerCase() === 'delivered' ? 'bg-green-500' :
                      status.toLowerCase() === 'processing' ? 'bg-blue-500' :
                      status.toLowerCase() === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}