create table login(email varchar(255) Primary Key,password varchar(255))engine = innodb default charset =latin1;

create table classseats(trainno bigint,sp varchar(50),dp varchar(50),doj date,class varchar(20),fare int,seatsleft int) ENGINE =InnoDB Default Charset=latin1;

insert into classseats (`trainno`, `sp`, `dp`, `doj`, `class`, `fare`, `seatsleft`) values(12, 'Chandigarh', 'Jaipur', '2015-05-17', 'AC1', 3200, 20),
    (12, 'Chandigarh', 'Jaipur', '2015-05-17', 'AC3', 2400, 60),
    (12, 'Chandigarh', 'Jaipur', '2015-05-17', 'EC', 1200, 100),
    (12, 'Chandigarh', 'Jaipur', '2015-05-17', 'SL', 500, 200),
    (12, 'Jaipur', 'Kolkata', '2015-05-17', 'AC1', 2900, 5),
    (12, 'Jaipur', 'Kolkata', '2015-05-17', 'AC3', 2100, 40),
    (12, 'Jaipur', 'Kolkata', '2015-05-17', 'EC', 1500, 120),
    (12, 'Jaipur', 'Kolkata', '2015-05-17', 'SL', 800, 250),
    (12, 'Kolkata', 'Lucknow', '2015-05-17', 'AC1', 3100, 30),
    (12, 'Kolkata', 'Lucknow', '2015-05-17', 'AC3', 1900, 30),
    (12, 'Kolkata', 'Lucknow', '2015-05-17', 'EC', 1700, 150),
    (12, 'Kolkata', 'Lucknow', '2015-05-17', 'SL', 700, 220),
    (12, 'Lucknow', 'Delhi', '2015-05-17', 'AC1', 2750, 20),
    (12, 'Lucknow', 'Delhi', '2015-05-17', 'AC3', 2350, 60),
    (12, 'Lucknow', 'Delhi', '2015-05-17', 'EC', 1100, 118),
    (12, 'Lucknow', 'Delhi', '2015-05-17', 'SL', 900, 180),
    (18, 'Chandigarh', 'Jaipur', '2015-05-12', 'AC1', 2420, 50),
    (18, 'Chandigarh', 'Jaipur', '2015-05-12', 'AC3', 1700, 20),
    (18, 'Chandigarh', 'Jaipur', '2015-05-12', 'CC', 750, 120),
    (18, 'Jaipur', 'Delhi', '2015-05-12', 'AC1', 2750, 20),
    (18, 'Jaipur', 'Delhi', '2015-05-12', 'AC3', 1200, 20),
    (18, 'Jaipur', 'Delhi', '2015-05-12', 'CC', 900, 150),
    (20, 'Delhi', 'Jaipur', '2015-05-09', 'AC1', 4500, 20),
    (20, 'Delhi', 'Jaipur', '2015-05-09', 'AC2', 3200, 50),
    (20, 'Delhi', 'Jaipur', '2015-05-09', 'AC3', 2700, 50),
(20, 'Delhi', 'Jaipur', '2015-05-09', 'SL', 900, 300);

create table ticket(pnr int auto_increment Primary Key,trainno bigint,sp varchar(50),dp varchar(50), tfare bigint,class varchar(20),nos int,status varchar(50))engine=InnoDb Default CHARSET=latin1 AUTO_INCREMENT=61;

insert into ticket (`pnr`, `trainno`, `sp`, `dp`, `tfare`, `class`, `nos`, `status`) VALUES(51, 12, 'Chandigarh', 'Jaipur', 3300, 'AC1', 2, 'Confirmed'),
(57, 12, 'Chandigarh', 'Jaipur', 2200, 'AC1', 1, 'WAITING');

insert into ticket (`pnr`, `trainno`, `sp`, `dp`, `tfare`, `class`, `nos`, `status`) VALUES(58, 20, 'Delhi', 'Jaipur', 11200, 'AC2', 4, 'WAITING'),
 (59, 12, 'Lucknow', 'Delhi', 2200, 'EC', 2, 'Confirmed');

 create table schedule(id int primary key auto_increment, trainno int, sname varchar(50),arrival_time time,departure_time time, distance int)engine=InnoDB Default charset=latin1 auto_increment=42;

INSERT INTO `schedule` (`id`, `trainno`, `sname`, `arrival_time`, `departure_time`, `distance`) VALUES
    (1, 12, 'Chandigarh', '01:00:12', '01:00:00', 0),
    (2, 12, 'Jaipur', '03:45:15', '03:50:00', 100),
    (3, 12, 'Kolkata', '05:00:00', '05:15:00', 300),
    (4, 12, 'Lucknow', '11:50:10', '12:00:00', 450),
    (5, 12, 'Delhi', '16:30:00', '16:30:00', 600),
    (6, 13, 'Jammu Kashmir', '22:00:00', '22:00:00', 0),
    (7, 13, 'Delhi', '04:00:00', '04:05:00', 700),
    (8, 13, 'Rajasthan', '07:30:50', '07:33:00', 900),
    (9, 13, 'Allahbad', '09:00:00', '09:10:00', 1700),
    (10, 13, 'Patna', '11:45:00', '11:47:00', 2500),
    (11, 13, 'Madhya Pradesh', '13:00:00', '13:00:00', 3600),
    (12, 14, 'Jammu Kashmir', '01:00:12', '01:00:12', 0),
    (13, 14, 'Madras', '22:00:00', '22:00:00', 2500),
    (14, 15, 'Delhi', '16:00:00', '16:00:00', 0),
    (15, 15, 'Jaipur', '22:45:00', '22:45:00', 800),
    (16, 16, 'Jaipur', '03:30:00', '03:30:00', 0),
    (17, 16, 'Delhi', '09:30:00', '09:30:00', 800),
    (18, 17, 'Delhi', '00:00:14', '00:00:14', 0),
    (19, 17, 'Jaipur', '16:00:00', '16:10:00', 500),
    (20, 17, 'Chandigarh', '20:30:00', '20:30:00', 1200),
    (21, 18, 'Chandigarh', '08:05:00', '08:05:00', 0),
    (22, 18, 'Jaipur', '10:15:00', '10:20:00', 700),
    (23, 18, 'Delhi', '14:00:00', '14:00:00', 1200),
    (24, 6, 'Jaipur', '03:30:00', '03:30:00', 0),
    (25, 6, 'Allahbad', '08:00:00', '08:15:00', 200),
    (26, 6, 'Lucknow', '15:15:00', '15:15:00', 700),
    (27, 19, 'Lucknow', '13:30:00', '13:30:00', 0),
    (28, 19, 'Allahbad', '20:00:00', '20:10:00', 300),
    (29, 19, 'Jaipur', '05:15:00', '05:15:00', 700),
    (30, 20, 'Delhi', '10:04:00', '10:04:00', 0),
    (31, 20, 'Jaipur', '16:00:00', '16:00:00', 800),
    (32, 21, 'Jaipur', '20:00:00', '20:00:00', 0),
    (33, 21, 'Delhi', '10:00:00', '10:00:00', 800),
    (34, 22, 'Delhi', '16:35:00', '16:35:00', 0),
    (35, 22, 'Rajasthan', '20:00:00', '20:10:00', 1100),
    (36, 22, 'Madhya Pradesh', '03:30:00', '03:33:00', 1500),
    (37, 22, 'Mumbai', '09:00:00', '09:00:00', 2300),
    (38, 23, 'Mumbai', '01:00:00', '01:00:00', 0),
    (39, 23, 'Madhya Pradesh', '05:30:00', '05:40:00', 1500),
    (40, 23, 'Rajasthan', '15:45:00', '15:50:00', 2000),
(41, 23, 'Delhi', '20:30:00', '20:30:00', 2300);


create table pnr_details(pnr int,trainno bigint,email varchar(50),name varchar(50),class varchar(10), seat_no int auto_increment,key(seat_no))engine=InnoDb Default CHARSET=latin1 AUTO_INCREMENT=35;

create table modify_details(pnr int,trainno bigint,email varchar(50),class varchar(10),
curr_seat_no int , applied_seat_no int, status varchar(25))engine=InnoDb Default CHARSET=latin1 AUTO_INCREMENT=35;
