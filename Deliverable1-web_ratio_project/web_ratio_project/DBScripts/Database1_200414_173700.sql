-- Group [Group]
create table `group` (
   `oid`  integer  not null,
   `groupname`  varchar(255),
  primary key (`oid`)
);


-- Module [Module]
create table `module` (
   `oid`  integer  not null,
   `moduleid`  varchar(255),
   `modulename`  varchar(255),
  primary key (`oid`)
);


-- User [User]
create table `crosswalk` (
   `oid`  integer  not null,
   `location`  varchar(255),
   `cancross`  bit,
   `npedestrians`  integer,
   `ncars`  integer,
  primary key (`oid`)
);


-- Passadeira [ent1]
create table `passadeira` (
   `oid`  integer  not null,
   `positionx`  double precision,
   `npedestrians`  integer,
   `cancross`  bit,
   `ncars`  integer,
   `positiony`  double precision,
  primary key (`oid`)
);


-- Carro [ent2]
create table `carro` (
   `oid`  integer  not null,
   `positionx`  double precision,
   `positiony`  double precision,
  primary key (`oid`)
);


-- Pedestre [ent3]
create table `pedestre` (
   `oid`  integer  not null,
   `positionx`  double precision,
   `positiony`  double precision,
  primary key (`oid`)
);


-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group`  add column  `module_oid`  integer;
alter table `group`   add index fk_group_module (`module_oid`), add constraint fk_group_module foreign key (`module_oid`) references `module` (`oid`);


-- Group_Module [Group2Module_Module2Group]
create table `group_module` (
   `group_oid`  integer not null,
   `module_oid`  integer not null,
  primary key (`group_oid`, `module_oid`)
);
alter table `group_module`   add index fk_group_module_group (`group_oid`), add constraint fk_group_module_group foreign key (`group_oid`) references `group` (`oid`);
alter table `group_module`   add index fk_group_module_module (`module_oid`), add constraint fk_group_module_module foreign key (`module_oid`) references `module` (`oid`);


-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `crosswalk`  add column  `group_oid`  integer;
alter table `crosswalk`   add index fk_crosswalk_group (`group_oid`), add constraint fk_crosswalk_group foreign key (`group_oid`) references `group` (`oid`);


-- User_Group [User2Group_Group2User]
create table `user_group` (
   `crosswalk_oid`  integer not null,
   `group_oid`  integer not null,
  primary key (`crosswalk_oid`, `group_oid`)
);
alter table `user_group`   add index fk_user_group_crosswalk (`crosswalk_oid`), add constraint fk_user_group_crosswalk foreign key (`crosswalk_oid`) references `crosswalk` (`oid`);
alter table `user_group`   add index fk_user_group_group (`group_oid`), add constraint fk_user_group_group foreign key (`group_oid`) references `group` (`oid`);


-- Pedestre_Passadeira [rel13]
alter table `passadeira`  add column  `pedestre_oid`  integer;
alter table `passadeira`   add index fk_passadeira_pedestre (`pedestre_oid`), add constraint fk_passadeira_pedestre foreign key (`pedestre_oid`) references `pedestre` (`oid`);


-- Passadeira_Carro [rel7]
alter table `carro`  add column  `passadeira_oid`  integer;
alter table `carro`   add index fk_carro_passadeira (`passadeira_oid`), add constraint fk_carro_passadeira foreign key (`passadeira_oid`) references `passadeira` (`oid`);


-- Carro_Passadeira [rel8]
alter table `passadeira`  add column  `carro_oid`  integer;
alter table `passadeira`   add index fk_passadeira_carro (`carro_oid`), add constraint fk_passadeira_carro foreign key (`carro_oid`) references `carro` (`oid`);


-- Passadeira_Pedestre [rel9]
alter table `pedestre`  add column  `passadeira_oid`  integer;
alter table `pedestre`   add index fk_pedestre_passadeira (`passadeira_oid`), add constraint fk_pedestre_passadeira foreign key (`passadeira_oid`) references `passadeira` (`oid`);


