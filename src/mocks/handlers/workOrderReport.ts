import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

// Sabit veriler
const STORES = [
  'Ataşehir Migros', 'Kadıköy Migros', 'Maltepe Migros', 'Üsküdar Migros',
  'Beşiktaş Migros', 'Şişli Migros', 'Bakırköy Migros', 'Beylikdüzü Migros'
];

const TECHNICIANS = [
  'Ahmet Yılmaz', 'Mehmet Demir', 'Ali Kaya', 'Mustafa Çelik',
  'Ayşe Yıldız', 'Fatma Şahin', 'Zeynep Öztürk', 'Hasan Korkmaz'
];

const ISSUE_TYPES = [
  'Soğutma Sistemi', 'Klima Arızası', 'Elektrik Sistemi', 'Mekanik Arıza',
  'Yazılım Güncellemesi', 'Donanım Değişimi', 'Periyodik Bakım', 'Acil Müdahale'
];

const PRIORITIES = ['Düşük', 'Orta', 'Yüksek', 'Kritik'];
const STATUS = ['Beklemede', 'Devam Ediyor', 'Tamamlandı', 'İptal Edildi'];

// Yeni sabit veriler ekliyoruz
const SERVICES = [
  { code: 'SRV001', name: 'Soğutucu Bakım', cost: 450 },
  { code: 'SRV002', name: 'Klima Bakım', cost: 350 },
  { code: 'SRV003', name: 'Elektrik Arıza', cost: 600 },
  { code: 'SRV004', name: 'Mekanik Bakım', cost: 500 },
  { code: 'SRV005', name: 'Yazılım Güncelleme', cost: 250 },
  { code: 'SRV006', name: 'Donanım Değişim', cost: 800 },
  { code: 'SRV007', name: 'Periyodik Kontrol', cost: 200 },
  { code: 'SRV008', name: 'Acil Onarım', cost: 750 }
];

const PARTS = [
  { code: 'PRT001', name: 'Soğutucu Fan', cost: 320, unit: 'Adet' },
  { code: 'PRT002', name: 'Termostat', cost: 450, unit: 'Adet' },
  { code: 'PRT003', name: 'Kompresör', cost: 1200, unit: 'Adet' },
  { code: 'PRT004', name: 'Kontrol Kartı', cost: 680, unit: 'Adet' },
  { code: 'PRT005', name: 'Sensör', cost: 150, unit: 'Adet' },
  { code: 'PRT006', name: 'Filtre', cost: 90, unit: 'Adet' },
  { code: 'PRT007', name: 'Conta', cost: 45, unit: 'Metre' },
  { code: 'PRT008', name: 'Soğutucu Gaz', cost: 280, unit: 'Kg' }
];

// Yardımcı fonksiyonlar
const generateRandomDate = (start: Date, end: Date) => {
  return faker.date.between({ from: start, to: end });
};

const generateUsedParts = () => {
  const numberOfParts = faker.number.int({ min: 0, max: 3 });
  const usedParts = [];
  
  for (let i = 0; i < numberOfParts; i++) {
    const part = faker.helpers.arrayElement(PARTS);
    usedParts.push({
      ...part,
      quantity: faker.number.int({ min: 1, max: 5 }),
      totalCost: part.cost * faker.number.int({ min: 1, max: 5 })
    });
  }
  
  return usedParts;
};

const generateUsedServices = () => {
  const numberOfServices = faker.number.int({ min: 1, max: 2 });
  const usedServices = [];
  
  for (let i = 0; i < numberOfServices; i++) {
    const service = faker.helpers.arrayElement(SERVICES);
    usedServices.push({
      ...service,
      duration: faker.number.int({ min: 30, max: 180 }), // dakika
      totalCost: service.cost
    });
  }
  
  return usedServices;
};

const generateWorkOrderReport = (startDate: Date, endDate: Date) => {
  const usedParts = generateUsedParts();
  const usedServices = generateUsedServices();
  
  const report = {
    id: faker.string.uuid(),
    createdAt: generateRandomDate(startDate, endDate),
    completedAt: null as Date | null,
    store: faker.helpers.arrayElement(STORES),
    technician: faker.helpers.arrayElement(TECHNICIANS),
    issueType: faker.helpers.arrayElement(ISSUE_TYPES),
    priority: faker.helpers.arrayElement(PRIORITIES),
    status: faker.helpers.arrayElement(STATUS),
    responseTime: faker.number.int({ min: 15, max: 120 }),
    resolutionTime: faker.number.int({ min: 30, max: 480 }),
    customerSatisfaction: faker.number.int({ min: 1, max: 5 }),
    services: usedServices,
    parts: usedParts,
    totalServiceCost: usedServices.reduce((acc, service) => acc + service.totalCost, 0),
    totalPartsCost: usedParts.reduce((acc, part) => acc + part.totalCost, 0),
    totalCost: usedServices.reduce((acc, service) => acc + service.totalCost, 0) + 
               usedParts.reduce((acc, part) => acc + part.totalCost, 0),
    notes: faker.lorem.sentence(),
    temperature: faker.number.float({ min: 18, max: 26, precision: 0.1 }),
    energyEfficiency: faker.number.float({ min: 70, max: 98, precision: 0.1 }),
  };

  // Eğer durum 'Tamamlandı' ise completedAt ekle
  if (report.status === 'Tamamlandı') {
    const minCompletedAt = new Date(report.createdAt);
    const maxCompletedAt = new Date(minCompletedAt);
    maxCompletedAt.setHours(maxCompletedAt.getHours() + 24);
    report.completedAt = generateRandomDate(minCompletedAt, maxCompletedAt);
  }

  return report;
};

// 2023 yılı için aylık veriler oluştur (her ay için yaklaşık 35-40 kayıt)
const generateYearlyData = () => {
  const reports = [];
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-12-31');

  // 420 kayıt oluştur (35 kayıt x 12 ay)
  for (let i = 0; i < 420; i++) {
    reports.push(generateWorkOrderReport(startDate, endDate));
  }

  return reports.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

const yearlyReports = generateYearlyData();

// API handlers
export const workOrderReportHandlers = [
  // Tüm rapor verilerini getir
  http.get('/api/work-order-reports', () => {
    return HttpResponse.json(yearlyReports);
  }),

  // Belirli bir tarih aralığındaki verileri getir
  http.get('/api/work-order-reports/range', ({ request }) => {
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    if (!startDate || !endDate) {
      return new HttpResponse(
        JSON.stringify({ error: 'Tarih aralığı gerekli' }),
        { status: 400 }
      );
    }

    const filteredReports = yearlyReports.filter(report => {
      const reportDate = new Date(report.createdAt);
      return reportDate >= new Date(startDate) && reportDate <= new Date(endDate);
    });

    return HttpResponse.json(filteredReports);
  }),

  // Özet istatistikler
  http.get('/api/work-order-reports/summary', () => {
    const summary = {
      totalWorkOrders: yearlyReports.length,
      completedWorkOrders: yearlyReports.filter(r => r.status === 'Tamamlandı').length,
      averageResponseTime: Math.round(
        yearlyReports.reduce((acc, r) => acc + r.responseTime, 0) / yearlyReports.length
      ),
      averageResolutionTime: Math.round(
        yearlyReports.reduce((acc, r) => acc + r.resolutionTime, 0) / yearlyReports.length
      ),
      averageCustomerSatisfaction: (
        yearlyReports.reduce((acc, r) => acc + r.customerSatisfaction, 0) / yearlyReports.length
      ).toFixed(1),
      totalCost: yearlyReports.reduce((acc, r) => acc + r.totalCost, 0),
      byPriority: PRIORITIES.map(priority => ({
        priority,
        count: yearlyReports.filter(r => r.priority === priority).length
      })),
      byStatus: STATUS.map(status => ({
        status,
        count: yearlyReports.filter(r => r.status === status).length
      })),
      byStore: STORES.map(store => ({
        store,
        count: yearlyReports.filter(r => r.store === store).length
      })),
      byTechnician: TECHNICIANS.map(technician => ({
        technician,
        count: yearlyReports.filter(r => r.technician === technician).length,
        averageResolutionTime: Math.round(
          yearlyReports
            .filter(r => r.technician === technician)
            .reduce((acc, r) => acc + r.resolutionTime, 0) /
          yearlyReports.filter(r => r.technician === technician).length
        )
      }))
    };

    return HttpResponse.json(summary);
  })
]; 