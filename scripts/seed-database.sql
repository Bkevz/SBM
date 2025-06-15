-- Comprehensive Database Seeding Script for Biashara Pro
-- This script will populate your Neon database with realistic sample data

-- Clear existing data (optional - remove if you want to keep existing data)
-- TRUNCATE TABLE payment_items, payments, notifications, team_invitations, customers, products, users, businesses RESTART IDENTITY CASCADE;

-- Insert sample businesses
INSERT INTO businesses (name, business_type, description, address, phone, email, currency, tax_pin, business_license) VALUES
('Kamau General Store', 'retail', 'A family-owned general store serving the local community with quality products at affordable prices.', '123 Kenyatta Avenue, Nairobi', '+254712345678', 'info@kamaustore.co.ke', 'KES', 'P051234567A', 'BL/2023/001234'),
('Mama Njeri Grocery', 'retail', 'Fresh groceries and household items for the neighborhood', '45 Tom Mboya Street, Nakuru', '+254723456789', 'info@mamanjeri.co.ke', 'KES', 'P051234568B', 'BL/2023/001235'),
('Kibera Electronics Hub', 'electronics', 'Mobile phones, accessories and electronics repair services', '78 Kibera Drive, Nairobi', '+254734567890', 'sales@kiberaelectronics.co.ke', 'KES', 'P051234569C', 'BL/2023/001236')
ON CONFLICT DO NOTHING;

-- Insert sample users (password is 'password123' hashed with bcrypt)
INSERT INTO users (name, email, hashed_password, role, status, business_id) VALUES
-- Kamau General Store users
('John Kamau', 'john@kamaustore.co.ke', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5/Qe2', 'admin', 'active', 1),
('Mary Wanjiku', 'mary@kamaustore.co.ke', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5/Qe2', 'manager', 'active', 1),
('Peter Ochieng', 'peter@kamaustore.co.ke', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5/Qe2', 'staff', 'active', 1),

-- Mama Njeri Grocery users
('Grace Njeri', 'grace@mamanjeri.co.ke', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5/Qe2', 'admin', 'active', 2),
('David Mwangi', 'david@mamanjeri.co.ke', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5/Qe2', 'staff', 'active', 2),

-- Kibera Electronics users
('Samuel Otieno', 'samuel@kiberaelectronics.co.ke', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5/Qe2', 'admin', 'active', 3)
ON CONFLICT (email) DO NOTHING;

-- Insert comprehensive product catalog
INSERT INTO products (name, category, price, stock, low_stock_threshold, business_id) VALUES
-- Kamau General Store products
('Maize Flour 2kg (Pembe)', 'food', 150.00, 45, 10, 1),
('Cooking Oil 1L (Elianto)', 'food', 280.00, 8, 15, 1),
('Sugar 1kg (Mumias)', 'food', 120.00, 25, 10, 1),
('Rice 2kg (Pishori)', 'food', 200.00, 30, 12, 1),
('Tea Leaves 500g (Kericho Gold)', 'beverages', 150.00, 20, 5, 1),
('Milk 500ml (Brookside)', 'beverages', 60.00, 50, 20, 1),
('Bread 400g (Superloaf)', 'food', 55.00, 30, 10, 1),
('Eggs (Tray of 30)', 'food', 420.00, 15, 5, 1),
('Soap Bar (Geisha)', 'household', 25.00, 100, 20, 1),
('Toilet Paper (Softcare)', 'household', 180.00, 40, 10, 1),
('Washing Powder 1kg (Omo)', 'household', 320.00, 25, 8, 1),
('Salt 500g (Kensalt)', 'food', 35.00, 80, 15, 1),
('Tomatoes 1kg', 'food', 80.00, 20, 5, 1),
('Onions 1kg', 'food', 60.00, 25, 5, 1),
('Potatoes 2kg', 'food', 120.00, 35, 8, 1),

-- Mama Njeri Grocery products
('Maize Flour 2kg (Jogoo)', 'food', 145.00, 60, 15, 2),
('Cooking Oil 2L (Fresh Fri)', 'food', 520.00, 12, 5, 2),
('Sugar 2kg (Kabras)', 'food', 230.00, 40, 10, 2),
('Rice 5kg (Basmati)', 'food', 850.00, 20, 5, 2),
('Coffee 100g (Java House)', 'beverages', 180.00, 25, 8, 2),
('Milk 1L (New KCC)', 'beverages', 110.00, 30, 10, 2),
('Chapati Flour 2kg', 'food', 160.00, 35, 10, 2),
('Beans 2kg (Red Kidney)', 'food', 280.00, 25, 8, 2),
('Detergent 500g (Sunlight)', 'household', 85.00, 50, 15, 2),
('Tissue Paper (Rosy)', 'household', 45.00, 60, 20, 2),

-- Kibera Electronics products
('Samsung Galaxy A14', 'electronics', 18500.00, 5, 2, 3),
('iPhone 12 (Refurbished)', 'electronics', 45000.00, 3, 1, 3),
('Tecno Spark 10', 'electronics', 12500.00, 8, 3, 3),
('Phone Charger (Type-C)', 'electronics', 350.00, 50, 10, 3),
('Phone Charger (Lightning)', 'electronics', 450.00, 30, 8, 3),
('Bluetooth Earphones', 'electronics', 1200.00, 25, 5, 3),
('Phone Case (Universal)', 'electronics', 250.00, 100, 20, 3),
('Screen Protector', 'electronics', 150.00, 80, 15, 3),
('Power Bank 10000mAh', 'electronics', 1800.00, 15, 5, 3),
('Memory Card 32GB', 'electronics', 800.00, 40, 10, 3)
ON CONFLICT DO NOTHING;

-- Insert diverse customer base
INSERT INTO customers (name, phone, email, total_purchases, last_purchase, status, business_id) VALUES
-- Kamau General Store customers
('Alice Wanjiru', '+254701234567', 'alice.wanjiru@gmail.com', 15420.00, '2024-01-15 10:30:00', 'active', 1),
('James Kiprotich', '+254712345678', 'james.kiprotich@yahoo.com', 8750.00, '2024-01-14 14:20:00', 'active', 1),
('Rose Achieng', '+254723456789', 'rose.achieng@outlook.com', 12300.00, '2024-01-13 09:15:00', 'active', 1),
('Michael Mwangi', '+254734567890', 'michael.mwangi@gmail.com', 6890.00, '2024-01-12 16:45:00', 'active', 1),
('Sarah Nyong''o', '+254745678901', 'sarah.nyongo@gmail.com', 9200.00, '2024-01-11 11:30:00', 'active', 1),
('Daniel Kipchoge', '+254756789012', 'daniel.kipchoge@gmail.com', 4500.00, '2024-01-10 08:20:00', 'active', 1),
('Faith Wambui', '+254767890123', 'faith.wambui@gmail.com', 7800.00, '2024-01-09 15:10:00', 'active', 1),
('Joseph Mutua', '+254778901234', 'joseph.mutua@gmail.com', 3200.00, '2024-01-08 12:45:00', 'active', 1),
('Catherine Njoki', '+254789012345', 'catherine.njoki@gmail.com', 11500.00, '2024-01-07 17:30:00', 'active', 1),
('Robert Otieno', '+254790123456', 'robert.otieno@gmail.com', 5600.00, '2024-01-06 13:15:00', 'active', 1),

-- Mama Njeri Grocery customers
('Margaret Wanjiku', '+254701111111', 'margaret.w@gmail.com', 8900.00, '2024-01-15 09:30:00', 'active', 2),
('Paul Kimani', '+254712222222', 'paul.kimani@gmail.com', 5400.00, '2024-01-14 11:20:00', 'active', 2),
('Lucy Muthoni', '+254723333333', 'lucy.muthoni@gmail.com', 7200.00, '2024-01-13 14:15:00', 'active', 2),
('Francis Kariuki', '+254734444444', 'francis.kariuki@gmail.com', 4800.00, '2024-01-12 16:45:00', 'active', 2),
('Jane Wairimu', '+254745555555', 'jane.wairimu@gmail.com', 6100.00, '2024-01-11 10:30:00', 'active', 2),

-- Kibera Electronics customers
('Kevin Omondi', '+254701000001', 'kevin.omondi@gmail.com', 67500.00, '2024-01-15 12:30:00', 'active', 3),
('Linda Akinyi', '+254712000002', 'linda.akinyi@gmail.com', 23400.00, '2024-01-14 15:20:00', 'active', 3),
('Brian Wekesa', '+254723000003', 'brian.wekesa@gmail.com', 18900.00, '2024-01-13 11:15:00', 'active', 3),
('Nancy Chebet', '+254734000004', 'nancy.chebet@gmail.com', 12600.00, '2024-01-12 09:45:00', 'active', 3),
('Victor Mbugua', '+254745000005', 'victor.mbugua@gmail.com', 31200.00, '2024-01-11 14:30:00', 'active', 3)
ON CONFLICT DO NOTHING;

-- Insert sample payments with realistic transaction patterns
INSERT INTO payments (customer_id, business_id, amount, status, method, transaction_id, mpesa_receipt_number, created_at) VALUES
-- Recent completed payments
(1, 1, 1250.00, 'completed', 'mpesa', 'TXN001', 'QA12B3C4D5', '2024-01-15 10:30:00'),
(2, 1, 850.00, 'completed', 'cash', 'TXN002', NULL, '2024-01-15 09:15:00'),
(3, 1, 2100.00, 'completed', 'mpesa', 'TXN003', 'QB34C5D6E7', '2024-01-15 11:45:00'),
(4, 1, 650.00, 'completed', 'cash', 'TXN004', NULL, '2024-01-15 08:20:00'),
(5, 1, 1800.00, 'completed', 'mpesa', 'TXN005', 'QC56D7E8F9', '2024-01-14 16:30:00'),
(6, 1, 420.00, 'completed', 'cash', 'TXN006', NULL, '2024-01-14 14:15:00'),
(7, 1, 950.00, 'completed', 'mpesa', 'TXN007', 'QD78E9F0G1', '2024-01-14 12:45:00'),
(8, 1, 320.00, 'completed', 'cash', 'TXN008', NULL, '2024-01-14 10:20:00'),
(9, 1, 1500.00, 'completed', 'mpesa', 'TXN009', 'QE90F1G2H3', '2024-01-13 17:30:00'),
(10, 1, 780.00, 'completed', 'cash', 'TXN010', NULL, '2024-01-13 15:10:00'),

-- Mama Njeri Grocery payments
(11, 2, 1200.00, 'completed', 'mpesa', 'TXN011', 'QF12G3H4I5', '2024-01-15 09:30:00'),
(12, 2, 680.00, 'completed', 'cash', 'TXN012', NULL, '2024-01-14 11:20:00'),
(13, 2, 1450.00, 'completed', 'mpesa', 'TXN013', 'QG34H5I6J7', '2024-01-13 14:15:00'),
(14, 2, 520.00, 'completed', 'cash', 'TXN014', NULL, '2024-01-12 16:45:00'),
(15, 2, 890.00, 'completed', 'mpesa', 'TXN015', 'QH56I7J8K9', '2024-01-11 10:30:00'),

-- Kibera Electronics payments
(16, 3, 18500.00, 'completed', 'mpesa', 'TXN016', 'QI78J9K0L1', '2024-01-15 12:30:00'),
(17, 3, 1200.00, 'completed', 'cash', 'TXN017', NULL, '2024-01-14 15:20:00'),
(18, 3, 12500.00, 'completed', 'mpesa', 'TXN018', 'QJ90K1L2M3', '2024-01-13 11:15:00'),
(19, 3, 800.00, 'completed', 'cash', 'TXN019', NULL, '2024-01-12 09:45:00'),
(20, 3, 2400.00, 'completed', 'mpesa', 'TXN020', 'QK12L3M4N5', '2024-01-11 14:30:00'),

-- Some pending payments
(1, 1, 750.00, 'pending', 'mpesa', 'TXN021', NULL, '2024-01-15 18:00:00'),
(16, 3, 45000.00, 'pending', 'mpesa', 'TXN022', NULL, '2024-01-15 17:30:00')
ON CONFLICT DO NOTHING;

-- Insert payment items (what was purchased in each transaction)
INSERT INTO payment_items (payment_id, product_id, quantity, unit_price, total_price) VALUES
-- Payment 1 items (Kamau General Store)
(1, 1, 2, 150.00, 300.00),  -- Maize Flour
(1, 3, 3, 120.00, 360.00),  -- Sugar
(1, 9, 4, 25.00, 100.00),   -- Soap
(1, 12, 5, 35.00, 175.00),  -- Salt
(1, 6, 5, 60.00, 300.00),   -- Milk

-- Payment 2 items
(2, 7, 3, 55.00, 165.00),   -- Bread
(2, 6, 8, 60.00, 480.00),   -- Milk
(2, 13, 2, 80.00, 160.00),  -- Tomatoes

-- Payment 3 items
(3, 2, 2, 280.00, 560.00),  -- Cooking Oil
(3, 4, 3, 200.00, 600.00),  -- Rice
(3, 8, 1, 420.00, 420.00),  -- Eggs
(3, 11, 1, 320.00, 320.00), -- Washing Powder

-- Payment 4 items
(4, 5, 2, 150.00, 300.00),  -- Tea
(4, 12, 4, 35.00, 140.00),  -- Salt
(4, 14, 2, 60.00, 120.00),  -- Onions

-- Payment 5 items
(5, 1, 4, 150.00, 600.00),  -- Maize Flour
(5, 3, 2, 120.00, 240.00),  -- Sugar
(5, 15, 8, 120.00, 960.00), -- Potatoes

-- Electronics store items
(16, 21, 1, 18500.00, 18500.00), -- Samsung Galaxy A14
(18, 23, 1, 12500.00, 12500.00), -- Tecno Spark 10
(20, 26, 2, 1200.00, 2400.00)    -- Bluetooth Earphones
ON CONFLICT DO NOTHING;

-- Insert notifications for different scenarios
INSERT INTO notifications (user_id, type, title, message, priority, read, created_at) VALUES
-- Low stock notifications
(1, 'low_stock', 'Low Stock Alert', 'Cooking Oil 1L is running low (8 units remaining)', 'high', false, '2024-01-15 08:00:00'),
(1, 'low_stock', 'Low Stock Alert', 'Tea Leaves 500g is running low (5 units remaining)', 'medium', false, '2024-01-14 16:00:00'),
(4, 'low_stock', 'Low Stock Alert', 'Cooking Oil 2L is running low (5 units remaining)', 'high', false, '2024-01-15 09:00:00'),
(6, 'low_stock', 'Low Stock Alert', 'iPhone 12 is running low (1 unit remaining)', 'high', false, '2024-01-14 14:00:00'),

-- Payment notifications
(1, 'payment', 'Payment Received', 'M-Pesa payment of KSh 1,250 received from Alice Wanjiru', 'medium', true, '2024-01-15 10:30:00'),
(1, 'payment', 'Payment Received', 'Cash payment of KSh 850 received from James Kiprotich', 'medium', true, '2024-01-15 09:15:00'),
(4, 'payment', 'Payment Received', 'M-Pesa payment of KSh 1,200 received from Margaret Wanjiku', 'medium', false, '2024-01-15 09:30:00'),
(6, 'payment', 'Payment Received', 'M-Pesa payment of KSh 18,500 received from Kevin Omondi', 'medium', false, '2024-01-15 12:30:00'),

-- System notifications
(1, 'system', 'System Update', 'New features available: Enhanced analytics dashboard', 'low', true, '2024-01-14 16:00:00'),
(2, 'system', 'Backup Complete', 'Daily backup completed successfully', 'low', true, '2024-01-15 02:00:00'),
(4, 'system', 'System Maintenance', 'Scheduled maintenance completed', 'low', true, '2024-01-13 03:00:00'),

-- Role invite notifications
(1, 'role_invite', 'Team Invitation Sent', 'Invitation sent to Peter Ochieng (peter@kamaustore.co.ke)', 'medium', true, '2024-01-12 14:30:00'),
(4, 'role_invite', 'Team Invitation Sent', 'Invitation sent to David Mwangi (david@mamanjeri.co.ke)', 'medium', false, '2024-01-11 11:20:00')
ON CONFLICT DO NOTHING;

-- Insert team invitations
INSERT INTO team_invitations (business_id, email, name, role, invitation_token, message, status, invited_by, created_at, expires_at) VALUES
(1, 'susan.wanjiku@gmail.com', 'Susan Wanjiku', 'staff', 'inv_token_001', 'Welcome to our team! We are excited to have you join us.', 'pending', 1, '2024-01-14 10:00:00', '2024-01-21 10:00:00'),
(2, 'john.kiprotich@gmail.com', 'John Kiprotich', 'manager', 'inv_token_002', 'Looking forward to working with you!', 'pending', 4, '2024-01-13 15:30:00', '2024-01-20 15:30:00'),
(3, 'mary.achieng@gmail.com', 'Mary Achieng', 'staff', 'inv_token_003', 'Join our electronics team!', 'pending', 6, '2024-01-12 09:45:00', '2024-01-19 09:45:00')
ON CONFLICT DO NOTHING;

-- Create some summary views for quick analytics
CREATE OR REPLACE VIEW business_summary AS
SELECT 
    b.id,
    b.name,
    COUNT(DISTINCT u.id) as total_users,
    COUNT(DISTINCT p.id) as total_products,
    COUNT(DISTINCT c.id) as total_customers,
    COUNT(DISTINCT pay.id) as total_payments,
    COALESCE(SUM(CASE WHEN pay.status = 'completed' THEN pay.amount ELSE 0 END), 0) as total_revenue,
    COUNT(CASE WHEN p.stock <= p.low_stock_threshold THEN 1 END) as low_stock_products
FROM businesses b
LEFT JOIN users u ON b.id = u.business_id
LEFT JOIN products p ON b.id = p.business_id
LEFT JOIN customers c ON b.id = c.business_id
LEFT JOIN payments pay ON b.id = pay.business_id
GROUP BY b.id, b.name;

-- Display seeding results
SELECT 
    'Database seeding completed successfully!' as status,
    (SELECT COUNT(*) FROM businesses) as businesses_count,
    (SELECT COUNT(*) FROM users) as users_count,
    (SELECT COUNT(*) FROM products) as products_count,
    (SELECT COUNT(*) FROM customers) as customers_count,
    (SELECT COUNT(*) FROM payments) as payments_count,
    (SELECT COUNT(*) FROM payment_items) as payment_items_count,
    (SELECT COUNT(*) FROM notifications) as notifications_count,
    (SELECT COUNT(*) FROM team_invitations) as team_invitations_count;

-- Show business summary
SELECT * FROM business_summary;

-- Show recent activity
SELECT 
    'Recent Payments' as activity_type,
    p.created_at,
    c.name as customer_name,
    b.name as business_name,
    p.amount,
    p.method,
    p.status
FROM payments p
JOIN customers c ON p.customer_id = c.id
JOIN businesses b ON p.business_id = b.id
ORDER BY p.created_at DESC
LIMIT 10;
