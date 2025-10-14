INSERT INTO users (email, password, role, full_name, score) VALUES
('admin@example.com', '$2a$10$8.A.n.a.r.c.h.y.S.o.m.e.t.h.i.n.g.1', 'ADMIN', 'Admin User', 150),
('user1@example.com', '$2a$10$8.A.n.a.r.c.h.y.S.o.m.e.t.h.i.n.g.1', 'USER', 'User One', 120),
('user2@example.com', '$2a$10$8.A.n.a.r.c.h.y.S.o.m.e.t.h.i.n.g.1', 'USER', 'User Two', 95),
('user3@example.com', '$2a$10$8.A.n.a.r.c.h.y.S.o.m.e.t.h.i.n.g.1', 'USER', 'User Three', 200);

INSERT INTO activities (name, date, points, status, category, user_id) VALUES
('Участие в конференции', '2024-10-10', 10, 'APPROVED', 'SCIENTIFIC', 2),
('Победа в хакатоне', '2024-09-25', 50, 'APPROVED', 'SCIENTIFIC', 2),
('Сдача норм ГТО', '2024-10-15', 20, 'PENDING', 'SPORT', 2),
('Волонтерство', '2024-08-20', 15, 'REJECTED', 'SOCIAL', 3),
('Организация митапа', '2024-10-05', 30, 'APPROVED', 'ORGANIZATIONAL', 4);
