-- Seed data for customers
INSERT INTO customers (customer_code, name)
VALUES
('C001', 'สมชาย ใจดี'),
('C002', 'สมหญิง รักเรียน');

-- Seed data for stocks
INSERT INTO stocks (stock_code, name)
VALUES
('PTT', 'ปตท.'),
('SCB', 'ไทยพาณิชย์'),
('CPALL', 'ซีพีออลล์'),
('KBANK', 'กสิกรไทย'),
('BBL', 'กรุงเทพ'),
('ADVANC', 'แอดวานซ์อินโฟ'),
('TRUE', 'ทรูคอร์ปอเรชัน'),
('DTAC', 'โทเทิ่ล แอ็คเซ็ส');

-- Seed data for policies
INSERT INTO policies (policy_code, name)
VALUES
('KMASTER', 'นโยบายหุ้นไทย'),
('TMBUSB', 'นโยบายตราสารหนี้'),
('SCBDV', 'นโยบายหุ้นปันผล');

-- Seed data for policy stocks
INSERT INTO policy_stocks (policy_code, stock_code, weight)
VALUES
((SELECT policy_code FROM policies WHERE policy_code='KMASTER'),
 (SELECT stock_code FROM stocks WHERE stock_code='PTT'),
 40),

((SELECT policy_code FROM policies WHERE policy_code='KMASTER'),
 (SELECT stock_code FROM stocks WHERE stock_code='SCB'),
 35),

((SELECT policy_code FROM policies WHERE policy_code='KMASTER'),
 (SELECT stock_code FROM stocks WHERE stock_code='CPALL'),
 25);

INSERT INTO policy_stocks (policy_code, stock_code, weight)
VALUES
((SELECT policy_code FROM policies WHERE policy_code='TMBUSB'),
 (SELECT stock_code FROM stocks WHERE stock_code='KBANK'),
 50),

((SELECT policy_code FROM policies WHERE policy_code='TMBUSB'),
 (SELECT stock_code FROM stocks WHERE stock_code='BBL'),
 50);

INSERT INTO policy_stocks (policy_code, stock_code, weight)
VALUES
((SELECT policy_code FROM policies WHERE policy_code='SCBDV'),
 (SELECT stock_code FROM stocks WHERE stock_code='ADVANC'),
 40),

((SELECT policy_code FROM policies WHERE policy_code='SCBDV'),
 (SELECT stock_code FROM stocks WHERE stock_code='TRUE'),
 30),

((SELECT policy_code FROM policies WHERE policy_code='SCBDV'),
 (SELECT stock_code FROM stocks WHERE stock_code='DTAC'),
 30);