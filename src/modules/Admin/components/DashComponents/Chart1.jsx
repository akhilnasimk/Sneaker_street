import React, { useRef, useEffect, useContext, useMemo } from "react";
import Chart from "chart.js/auto";
import { OrderContext } from "../../AdminContext/OrderC";

export default function TopProducts() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  let { Order, setOrder, Sales } = useContext(OrderContext);

  // Process order data to get product sales
  const productSalesData = useMemo(() => {
    if (!Order || Order.length === 0) return [];
    
    // Create a map to track product sales
    const productMap = new Map();
    
    Order.forEach(order => {
      if (order.product && Array.isArray(order.product)) {
        order.product.forEach(product => {
          const productId = product.id;
          const productName = product.name || 'Unknown Product';
          const productCategory = product.category || 'Uncategorized';
          const quantity = product.quantity || 1;
          
          if (productMap.has(productId)) {
            const existing = productMap.get(productId);
            productMap.set(productId, {
              ...existing,
              sales: existing.sales + quantity,
              revenue: existing.revenue + (product.price * quantity)
            });
          } else {
            productMap.set(productId, {
              id: productId,
              name: productName,
              category: productCategory,
              sales: quantity,
              revenue: product.price * quantity
            });
          }
        });
      }
    });
    
    // Convert map to array and sort by sales (descending)
    return Array.from(productMap.values())
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4); // Get top 4 products
  }, [Order]);

  // Prepare data for chart
  const chartData = useMemo(() => {
    return {
      labels: productSalesData.map(item => item.name),
      sales: productSalesData.map(item => item.sales),
      revenue: productSalesData.map(item => item.revenue)
    };
  }, [productSalesData]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (productSalesData.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    
    // Create gradient for bars
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(168, 85, 247, 0.8)");
    gradient.addColorStop(0.7, "rgba(139, 92, 246, 0.6)");
    gradient.addColorStop(1, "rgba(124, 58, 237, 0.4)");
    
    // Create gradient for hover effect
    const hoverGradient = ctx.createLinearGradient(0, 0, 0, 400);
    hoverGradient.addColorStop(0, "rgba(110, 231, 183, 0.9)");
    hoverGradient.addColorStop(1, "rgba(110, 231, 183, 0.5)");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "Units Sold",
            data: chartData.sales,
            backgroundColor: gradient,
            hoverBackgroundColor: hoverGradient,
            borderColor: "rgba(139, 92, 246, 1)",
            borderWidth: 2,
            borderRadius: 8,
            hoverBorderColor: "rgba(110, 231, 183, 1)",
            hoverBorderWidth: 3,
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
            right: 20,
            bottom: 10,
            left: 10
          }
        },
        animation: {
          duration: 1500,
          easing: "easeOutQuart",
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(51, 65, 85, 0.3)",
              drawBorder: false,
            },
            ticks: {
              color: "#cbd5e1",
              font: {
                size: 12,
                weight: '500'
              },
              padding: 8,
              callback: function(value) {
                return value + ' units';
              }
            },
            title: {
              display: true,
              text: 'Units Sold',
              color: '#94a3b8',
              font: {
                size: 13,
                weight: 'bold'
              },
              padding: {
                bottom: 10
              }
            }
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: "#e2e8f0",
              font: {
                size: 11,
                weight: '600'
              },
              padding: 12,
              maxRotation: 0, // Prevent diagonal labels
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            titleColor: "#f1f5f9",
            bodyColor: "#e2e8f0",
            borderColor: "rgba(168, 85, 247, 0.8)",
            borderWidth: 2,
            cornerRadius: 12,
            padding: 16,
            displayColors: false,
            usePointStyle: true,
            boxPadding: 6,
            callbacks: {
              label: function(context) {
                const product = productSalesData[context.dataIndex];
                return [
                  `Units Sold: ${context.parsed.y}`,
                  `Revenue: $${product.revenue.toLocaleString()}`,
                  `Category: ${product.category}`
                ];
              },
              title: function(context) {
                return context[0].label;
              }
            }
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, productSalesData]);

  // Truncate long product names for display
  const truncateName = (name, maxLength = 20) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Top Selling Products</h3>
          <p className="text-sm text-slate-400 mt-1">Performance overview of best sellers</p>
        </div>
        <div className="flex items-center bg-purple-600/20 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
          <span className="text-xs text-purple-300 font-medium">Live Data</span>
        </div>
      </div>

      {/* Chart Section - Made bigger */}
      <div className="h-80 relative">
        {productSalesData.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16" />
              </svg>
              <p className="text-slate-400 text-sm">No sales data available</p>
              <p className="text-slate-500 text-xs mt-1">Orders will appear here</p>
            </div>
          </div>
        ) : (
          <>
            <canvas ref={chartRef} />
            {/* Modern decorative elements */}
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-purple-500/20 rounded-full animate-ping"></div>
            <div className="absolute -bottom-3 -left-3 w-5 h-5 bg-emerald-400/20 rounded-full animate-pulse"></div>
          </>
        )}
      </div>
      
      {/* Product List Summary */}
      {productSalesData.length > 0 && (
        <div className="mt-6 p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
          <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            TOP PERFORMERS
          </h4>
          
          <div className="space-y-3">
            {productSalesData.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-2 bg-slate-600/20 rounded-lg hover:bg-slate-600/30 transition-colors">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 ${
                    index === 0 ? 'bg-amber-500' : 
                    index === 1 ? 'bg-slate-500' : 
                    index === 2 ? 'bg-amber-700' : 'bg-purple-600'
                  }`}>
                    #{index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{truncateName(product.name)}</div>
                    <div className="text-xs text-slate-400">{product.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-400">{product.sales} units</div>
                  <div className="text-xs text-slate-400">${product.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}