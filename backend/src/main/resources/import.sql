INSERT INTO users (email, password, role, full_name) VALUES
('admin@admin.com', '$2a$10$sJ.e6gJUDIVQXQzIczeZouQh6Njp5bI2k6D1UjKADLTwEnRdazvtq', 'ADMIN', 'Admin User'),
('test1@test.com', '$2a$10$nWZR8rxuMYe1NVZN0IWCZevKQJ9ZZzh9uI6e9qfxJoNpzqyeEHYsi', 'USER', 'User One'),
('test2@test.com', '$2a$10$nWZR8rxuMYe1NVZN0IWCZevKQJ9ZZzh9uI6e9qfxJoNpzqyeEHYsi', 'USER', 'User Two'),
('test3@test.com', '$2a$10$nWZR8rxuMYe1NVZN0IWCZevKQJ9ZZzh9uI6e9qfxJoNpzqyeEHYsi', 'USER', 'User Three')
ON CONFLICT (email) DO NOTHING;

-- Activities for test1@test.com
INSERT INTO activities (name, date, points, status, category, user_id)
SELECT 'Участие в конференции', '2024-10-10', 10, 'APPROVED', 'SCIENTIFIC', (SELECT id FROM users WHERE email = 'test1@test.com')
WHERE NOT EXISTS (
    SELECT 1 FROM activities WHERE name = 'Участие в конференции' AND user_id = (SELECT id FROM users WHERE email = 'test1@test.com')
);

INSERT INTO activities (name, date, points, status, category, user_id)
SELECT 'Победа в хакатоне', '2024-09-25', 50, 'APPROVED', 'SCIENTIFIC', (SELECT id FROM users WHERE email = 'test1@test.com')
WHERE NOT EXISTS (
    SELECT 1 FROM activities WHERE name = 'Победа в хакатоне' AND user_id = (SELECT id FROM users WHERE email = 'test1@test.com')
);

INSERT INTO activities (name, date, points, status, category, user_id)
SELECT 'Сдача норм ГТО', '2024-10-15', 20, 'PENDING', 'SPORT', (SELECT id FROM users WHERE email = 'test1@test.com')
WHERE NOT EXISTS (
    SELECT 1 FROM activities WHERE name = 'Сдача норм ГТО' AND user_id = (SELECT id FROM users WHERE email = 'test1@test.com')
);

-- Activity for test2@test.com
INSERT INTO activities (name, date, points, status, category, user_id)
SELECT 'Волонтерство', '2024-08-20', 15, 'REJECTED', 'SOCIAL', (SELECT id FROM users WHERE email = 'test2@test.com')
WHERE NOT EXISTS (
    SELECT 1 FROM activities WHERE name = 'Волонтерство' AND user_id = (SELECT id FROM users WHERE email = 'test2@test.com')
);

-- Activity for test3@test.com
INSERT INTO activities (name, date, points, status, category, user_id)
SELECT 'Организация митапа', '2024-10-05', 30, 'APPROVED', 'ORGANIZATIONAL', (SELECT id FROM users WHERE email = 'test3@test.com')
WHERE NOT EXISTS (
    SELECT 1 FROM activities WHERE name = 'Организация митапа' AND user_id = (SELECT id FROM users WHERE email = 'test3@test.com')
);