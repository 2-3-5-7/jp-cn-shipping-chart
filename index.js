// 直接生成 {x, y}，原地追加到传入数组，使用克计算避免浮点误差
function generateLineData(startWeightKg, endWeightKg, stepKg, startPrice, stepPrice, fixedFee = 0, xy = []) {
    const startWeightG = Math.round(startWeightKg * 1000); // 转为克
    const endWeightG = Math.round(endWeightKg * 1000);
    const stepG = Math.round(stepKg * 1000);

    let weightG = startWeightG;
    let price = startPrice + fixedFee;

    while (weightG <= endWeightG) {
        xy.push({
            x: weightG / 1000, // 保持 x 单位为 kg
            y: Number((price / weightG).toFixed(2)) // 每克价格
        });

        weightG += stepG;
        price += stepPrice;
    }

    return xy;
}


// 彩虹桥 Plus
function lineRainbowPlus() {
    return generateLineData(0.5, 10, 0.1, 800, 160, 200);
}

// 彩虹桥
function lineRainbow() {
    return generateLineData(0.5, 3, 0.1, 900, 160, 200);
}

// 彩虹桥 Lite
function lineRainbowLite() {
    return generateLineData(0.5, 2.5, 0.5, 800, 500, 200);
}

// 纸飞机线路，分段计价，包含 200 手续费
function linePaperPlane() {
    const fixedFee = 200;
    const xy = [];

    // 首重 0.1kg，590起价。但是 0.1 的每克费用太高，所以从 0.3 开始画图
    generateLineData(0.3, 1.0, 0.1, 670, 40, fixedFee, xy);
    // 1~3kg，每增加0.1kg 增加50日元
    generateLineData(1.1, 3.0, 0.1, 590 + 40 * 9, 50, fixedFee, xy);
    // 3kg以上，每增加0.1kg 增加100日元，最高10kg
    generateLineData(3.1, 10.0, 0.1, 590 + 40 * 9 + 50 * 19, 100, fixedFee, xy);

    return xy; // 直接返回 {x, y} 数组
}

// 海运线路，每克价格计算 (含 200 手续费)
const seaShippingData = [
    // { weight: 0.5, price: 1800 + 200 },
    // { weight: 0.6, price: 1800 + 200 },
    { weight: 0.7, price: 1800 + 200 },
    { weight: 0.8, price: 1800 + 200 },
    { weight: 0.9, price: 1800 + 200 },
    { weight: 1.0, price: 1800 + 200 },
    { weight: 1.25, price: 2200 + 200 },
    { weight: 1.5, price: 2200 + 200 },
    { weight: 1.75, price: 2200 + 200 },
    { weight: 2.0, price: 2200 + 200 },
    { weight: 2.5, price: 2600 + 200 },
    { weight: 3.0, price: 2600 + 200 },
    { weight: 3.5, price: 3000 + 200 },
    { weight: 4.0, price: 3000 + 200 },
    { weight: 4.5, price: 3400 + 200 },
    { weight: 5.0, price: 3400 + 200 },
    { weight: 5.5, price: 3800 + 200 },
    { weight: 6.0, price: 3800 + 200 },
    { weight: 7.0, price: 4200 + 200 },
    { weight: 8.0, price: 4600 + 200 },
    { weight: 9.0, price: 5000 + 200 },
    { weight: 10.0, price: 5400 + 200 },
];

function lineKintoun() {
    // 前期不规则数据
    const kintounData = [
        { weight: 0.5, price: 900 },
        { weight: 1.0, price: 1050 },
        { weight: 1.5, price: 1250 },
        { weight: 2.0, price: 1500 },
    ];

    // 转换为 {x, y} 格式
    const kintounXY = kintounData.map(item => ({
        x: item.weight,
        y: Number((item.price / (item.weight * 1000)).toFixed(2))
    }));

    // 后续规律：每增加 0.5kg，价格加 250，无手续费，到 10kg
    generateLineData(
        2.5, // 开始重量
        10,  // 结束重量
        0.5,     // 步长
        1800,  // 起始价格
        250,   // 每步增加价格
        0,     // 无手续费
        kintounXY      // 原地追加
    );

    return kintounXY;
}

function lineKintounFixed() {
    // 前期不规则数据
    // 算上经常可以 500 积分抵扣，但同时 200 加固费用，所以 -300
    const kintounData = [
        { weight: 0.5, price: 900 - 300 },
        { weight: 1.0, price: 1050 - 300 },
        { weight: 1.5, price: 1250 - 300 },
        { weight: 2.0, price: 1500 - 300 },
    ];

    // 转换为 {x, y} 格式
    const kintounXY = kintounData.map(item => ({
        x: item.weight,
        y: Number((item.price / (item.weight * 1000)).toFixed(2))
    }));

    // 后续规律：每增加 0.5kg，价格加 250，无手续费，到 10kg
    generateLineData(
        2.5, // 开始重量
        10,  // 结束重量
        0.5,     // 步长
        1800,  // 起始价格
        250,   // 每步增加价格
        -100,     // 500积分，和换箱加固 400，400 - 500 = -100
        kintounXY      // 原地追加
    );

    return kintounXY;
}

// 竹蜻蜓
const takecopterData = [
    // { weight: 0.1, price: 570 },
    // { weight: 0.2, price: 610 },
    { weight: 0.3, price: 650 },
    { weight: 0.4, price: 690 },
    { weight: 0.5, price: 740 },
    { weight: 0.6, price: 760 },
    { weight: 0.7, price: 770 },
    { weight: 0.8, price: 780 },
    { weight: 0.9, price: 790 },
    { weight: 1.0, price: 940 },
    { weight: 1.1, price: 960 },
    { weight: 1.2, price: 970 },
    { weight: 1.3, price: 980 },
    { weight: 1.4, price: 990 },
    { weight: 1.5, price: 1180 },
    { weight: 1.6, price: 1230 },
    { weight: 1.7, price: 1240 },
    { weight: 1.8, price: 1240 },
    { weight: 1.9, price: 1240 },
    { weight: 2.0, price: 1430 },
    { weight: 2.5, price: 1800 },
    { weight: 3.0, price: 2100 },
];

function linePinyou() {
    const RMB_TO_JPY = 1 / 0.0473;
    const xy = [];
    const boxWeight = 0.2;  // 算上箱子重量

    // 国内运费
    const feeMap = { 1: 8, 2: 13, 3: 18, 4: 23, 5: 28 };

    for (let kg = 1; kg <= 5; kg++) {
        generateLineData(
            kg - 1 + 0.1 + boxWeight,                  // startWeight
            kg + boxWeight,                      // endWeight
            0.1,                     // step (100g)

            (kg - 1 + 0.1) * 100 * RMB_TO_JPY,    // 1kg = 100 RMB
            10 * RMB_TO_JPY,                // 100g = 10 RMB
            feeMap[kg] * RMB_TO_JPY,        // 当段手续费 RMB → JPY
            xy
        );
    }

    return xy;
}

// 精灵集市申通
function lineElfShentong() {
    const minWeightKg = 0.5;  // 500g
    const maxWeightKg = 3;    // 3kg
    const stepKg = 0.1;       // 每 100g
    const startPrice = 650;   // 最低 500g 价格
    const stepPrice = 130;    // 每 100g 增加价格
    return generateLineData(minWeightKg, maxWeightKg, stepKg, startPrice, stepPrice);
}

function lineRakutaoShentong() {
    // 前期不规则数据
    const rakutaoData = [
        { weight: 0.5, price: 800 },
        { weight: 1.0, price: 1450 }
    ];

    // 转换为 {x, y} 格式
    const rakutaoXY = rakutaoData.map(item => ({
        x: item.weight,
        y: Number((item.price / (item.weight * 1000)).toFixed(2))
    }));

    // 后续规律：每增加 100g，价格加 145 日元，最大 3kg
    generateLineData(
        1.1,   // 开始重量 kg
        3.0,   // 结束重量 kg
        0.1,   // 每步 100g
        1450 + 145,  // 起始价格（上一段价格）
        145,   // 每步增加价格
        0,     // 固定费用
        rakutaoXY  // 原地追加
    );

    return rakutaoXY;
}

function lineDocobuyYuying() {
    const fixedFee = 200;
    const xy = [];

    generateLineData(0.3, 2.0, 0.1, 736, 48, fixedFee, xy);
    generateLineData(2.1, 6.0, 0.1, 640 + 48 * 19 + 80, 80, fixedFee, xy);
    generateLineData(6.1, 10.0, 0.1, 640 + 48 * 19 + 80 * 40 + 112, 112, fixedFee, xy);

    return xy;
}

function lineJPGOODBUYPhoenix() {
    const RMB_TO_JPY = 1 / 0.04686;

    const phoenixData = [
        { weight: 0.3, price: 35 },
        { weight: 0.5, price: 46 },
        { weight: 0.6, price: 53 },
        { weight: 0.7, price: 61 },
        { weight: 0.8, price: 68 },
        { weight: 0.9, price: 75 },
        { weight: 1.0, price: 79 },
        { weight: 1.1, price: 86 },
        { weight: 1.2, price: 93 },
        { weight: 1.3, price: 99 },
        { weight: 1.4, price: 105 },
        { weight: 1.5, price: 111 },
        { weight: 1.6, price: 118 },
        { weight: 1.7, price: 125 },
        { weight: 1.8, price: 131 },
        { weight: 1.9, price: 138 },
        { weight: 2.0, price: 145 },
        { weight: 2.1, price: 151 },
        { weight: 2.2, price: 157 },
        { weight: 2.3, price: 163 },
        { weight: 2.4, price: 169 },
        { weight: 2.5, price: 176 },
    ];

    return phoenixData.map(item => ({
        x: item.weight,
        y: Number(((item.price * RMB_TO_JPY) / (item.weight * 1000)).toFixed(2))
    }));
}

function lineAirline() {
    return generateLineData(1, 10.0, 1, 2050, 700, 200);
}

function lineEMS() {
    const fixedFee = 200;
    const xy = [];

    generateLineData(0.6, 1, 0.1, 1600, 150, fixedFee, xy);
    generateLineData(1.25, 2, 0.25, 2500, 300, fixedFee, xy);
    generateLineData(2.5, 6, 0.5, 3900, 500, fixedFee, xy);
    generateLineData(7, 10, 1, 8200, 800, fixedFee, xy);

    return xy;
}

// 主函数：渲染所有线路
// 注意 Y 值存在波动，波动上涨最大为 步长 / 前一个点的 x 值
// 比如 筋斗云 1kg 0.75日元/g，假如恰好为 501g 的货物，则新每克价格 0.75*1000/500 = 1.5 日元/g，涨幅为 步长 500 / 前一个点的 x 500，即上涨 100% 一倍
// 因此为了减少跳档带来的每克价格上涨，可以减少步长，或者增加 x 的值，也就是货物重量
function initAllLines(ctx) {
    const rainbowPlus = lineRainbowPlus();
    const rainbow = lineRainbow();
    const rainbowLite = lineRainbowLite();
    const paperPlane = linePaperPlane();
    const seaShipping = seaShippingData.map(item => ({
        x: item.weight,
        y: Number(((item.price) / (item.weight * 1000)).toFixed(2))
    }));
    const kintounCloud = lineKintounFixed();    // lineKintoun();
    const takecopter = takecopterData.map(item => ({
        x: item.weight,
        y: Number(((item.price) / (item.weight * 1000)).toFixed(2))
    }));
    const pinyou = linePinyou();
    const elfShentong = lineElfShentong();
    const rakutaoShentong = lineRakutaoShentong();
    const docobuyYuying = lineDocobuyYuying();
    const jpgoodbuyPhoenix = lineJPGOODBUYPhoenix();
    const airline = lineAirline();
    const ems = lineEMS();

    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: '彩虹桥 Plus',
                    data: rainbowPlus,
                    borderColor: '#4A90E2',
                    backgroundColor: 'rgba(74,144,226,0.3)'
                },
                {
                    label: '彩虹桥',
                    data: rainbow,
                    borderColor: '#F06292',
                    backgroundColor: 'rgba(240,98,146,0.3)'
                },
                {
                    label: '彩虹桥 Lite',
                    data: rainbowLite,
                    borderColor: '#FFB74D',
                    backgroundColor: 'rgba(255,183,77,0.3)'
                },
                {
                    label: '纸飞机',
                    data: paperPlane,
                    borderColor: '#FFE082',
                    backgroundColor: 'rgba(255,224,130,0.3)'
                },
                {
                    label: '海运-乐一番',
                    data: seaShipping,
                    borderColor: '#4DB6AC',
                    backgroundColor: 'rgba(77,182,172,0.3)'
                },
                {
                    label: '筋斗云-算积分和打包',
                    data: kintounCloud,
                    borderColor: '#9575CD',
                    backgroundColor: 'rgba(149,117,205,0.3)'
                },
                {
                    label: '竹蜻蜓',
                    data: takecopter,
                    borderColor: '#B0BEC5',
                    backgroundColor: 'rgba(176,190,197,0.3)'
                },
                {
                    label: '拼邮-任你购-200g箱子',
                    data: pinyou,
                    borderColor: '#64B5F6',
                    backgroundColor: 'rgba(100,181,246,0.3)'
                },
                {
                    label: '凤凰-JPGB-不能合箱',
                    data: jpgoodbuyPhoenix,
                    borderColor: '#F48FB1',
                    backgroundColor: 'rgba(244,143,177,0.3)'
                },
                {
                    label: '申通-乐酷淘',
                    data: rakutaoShentong,
                    borderColor: '#81C784',
                    backgroundColor: 'rgba(129,199,132,0.3)'
                },
                {
                    label: '鱼鹰-docobuy',
                    data: docobuyYuying,
                    borderColor: '#8D6E63',
                    backgroundColor: 'rgba(141,110,99,0.3)'
                },
                {
                    label: '空运-乐一番',
                    data: airline,
                    borderColor: '#78909C',
                    backgroundColor: 'rgba(120,144,156,0.3)'
                },
                {
                    label: 'EMS-乐一番',
                    data: ems,
                    borderColor: '#D4E157',
                    backgroundColor: 'rgba(212,225,87,0.3)'
                },
            ]
        },
        options: options,
        plugins: [verticalLinePlugin]
    });
}

const verticalLinePlugin = {
    id: 'verticalLinePlugin',
    afterDraw: (chart) => {
        const activeElements = chart.getActiveElements();

        if (activeElements && activeElements.length) {
            const ctx = chart.ctx;
            ctx.save();

            const activePoint = activeElements[0];
            const x = activePoint.element.x;

            const topY = chart.scales.y.top;
            const bottomY = chart.scales.y.bottom;

            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // 半透明红色虚线
            ctx.setLineDash([5, 5]); // 虚线
            ctx.stroke();
            ctx.restore();
        }
    }
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'nearest', // 改为 nearest
        intersect: false,
        axis: 'x'        // 只沿 x 轴匹配最近点
    },
    plugins: {
        tooltip: {
            enabled: true,
            mode: 'nearest', // 与 interaction 保持一致
            intersect: false,
            // 1. 告诉 Chart.js 使用我们刚注册的函数
            position: 'mouseFollowY',

            // 2. (推荐) 让提示框以我们返回的 y 坐标为中心
            //    这能防止提示框在图表顶部/底部时被遮挡
            yAlign: 'center'
        },
        legend: { display: true },
        verticalLinePlugin: {} // 自定义插件保持不变
    },
    scales: {
        x: {
            type: 'linear',
            title: { display: true, text: '重量 (kg)' }
        },
        y: {
            title: { display: true, text: '每克价格 (日元/g)' }
        }
    }
};

/**
 * 注册一个自定义的 Tooltip 定位器
 * @param {Array} items - 当前激活的 tooltip 元素
 * @param {object} eventPosition - 包含 {x, y} 的鼠标/触摸位置
 * @returns {object|false} - 返回 {x, y} 坐标或 false
 */
Chart.Tooltip.positioners.mouseFollowY = function(items, eventPosition) {
    // 如果没有找到元素，则不显示
    if (!items.length) {
        return false;
    }

    // 返回一个坐标对象：
    return {
        // X 轴：使用数据点的 X 坐标 (与你的红线保持一致)
        x: items[0].element.x,

        // Y 轴：使用鼠标事件的 Y 坐标 (你想要的效果)
        y: eventPosition.y
    };
};