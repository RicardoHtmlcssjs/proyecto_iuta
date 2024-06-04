PGDMP         6                |            guerreros_gym    10.23    10.23 )               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false                       1262    24576    guerreros_gym    DATABASE     �   CREATE DATABASE guerreros_gym WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Venezuela.1252' LC_CTYPE = 'Spanish_Venezuela.1252';
    DROP DATABASE guerreros_gym;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false                       0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    32804    clientes    TABLE     �   CREATE TABLE public.clientes (
    id_cliente integer NOT NULL,
    fecha_reg date NOT NULL,
    hora_reg time with time zone NOT NULL,
    fk_usuario integer NOT NULL,
    fec_ultimo_pago date NOT NULL,
    fec_venci character varying(100) NOT NULL
);
    DROP TABLE public.clientes;
       public         postgres    false    3            �            1259    32802    clientes_id_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public.clientes_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.clientes_id_cliente_seq;
       public       postgres    false    201    3                       0    0    clientes_id_cliente_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.clientes_id_cliente_seq OWNED BY public.clientes.id_cliente;
            public       postgres    false    200            �            1259    32837    pagos    TABLE     �   CREATE TABLE public.pagos (
    id_pago integer NOT NULL,
    fk_usu_adm integer NOT NULL,
    fk_cliente integer NOT NULL,
    fec_pago date NOT NULL,
    cant_mes_pag integer NOT NULL
);
    DROP TABLE public.pagos;
       public         postgres    false    3            �            1259    32835    forma_pago_id_pago_seq    SEQUENCE     �   CREATE SEQUENCE public.forma_pago_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.forma_pago_id_pago_seq;
       public       postgres    false    203    3                       0    0    forma_pago_id_pago_seq    SEQUENCE OWNED BY     L   ALTER SEQUENCE public.forma_pago_id_pago_seq OWNED BY public.pagos.id_pago;
            public       postgres    false    202            �            1259    24587    roles    TABLE     l   CREATE TABLE public.roles (
    id_role integer NOT NULL,
    descripcion character varying(50) NOT NULL
);
    DROP TABLE public.roles;
       public         postgres    false    3            �            1259    24585    roles_id_role_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.roles_id_role_seq;
       public       postgres    false    3    197                       0    0    roles_id_role_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.roles_id_role_seq OWNED BY public.roles.id_role;
            public       postgres    false    196            �            1259    32779    usuarios    TABLE     �  CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    cedula integer NOT NULL,
    telefono bigint,
    fk_role integer NOT NULL,
    usuario character varying NOT NULL,
    correo character varying(100) NOT NULL,
    hora_reg time with time zone NOT NULL,
    fecha_reg date NOT NULL,
    contrasena character varying(255) NOT NULL
);
    DROP TABLE public.usuarios;
       public         postgres    false    3            �            1259    32777    usuarios_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.usuarios_id_usuario_seq;
       public       postgres    false    199    3                       0    0    usuarios_id_usuario_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;
            public       postgres    false    198            �
           2604    32807    clientes id_cliente    DEFAULT     z   ALTER TABLE ONLY public.clientes ALTER COLUMN id_cliente SET DEFAULT nextval('public.clientes_id_cliente_seq'::regclass);
 B   ALTER TABLE public.clientes ALTER COLUMN id_cliente DROP DEFAULT;
       public       postgres    false    200    201    201            �
           2604    32840    pagos id_pago    DEFAULT     s   ALTER TABLE ONLY public.pagos ALTER COLUMN id_pago SET DEFAULT nextval('public.forma_pago_id_pago_seq'::regclass);
 <   ALTER TABLE public.pagos ALTER COLUMN id_pago DROP DEFAULT;
       public       postgres    false    202    203    203            �
           2604    24590    roles id_role    DEFAULT     n   ALTER TABLE ONLY public.roles ALTER COLUMN id_role SET DEFAULT nextval('public.roles_id_role_seq'::regclass);
 <   ALTER TABLE public.roles ALTER COLUMN id_role DROP DEFAULT;
       public       postgres    false    196    197    197            �
           2604    32782    usuarios id_usuario    DEFAULT     z   ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);
 B   ALTER TABLE public.usuarios ALTER COLUMN id_usuario DROP DEFAULT;
       public       postgres    false    199    198    199                      0    32804    clientes 
   TABLE DATA               k   COPY public.clientes (id_cliente, fecha_reg, hora_reg, fk_usuario, fec_ultimo_pago, fec_venci) FROM stdin;
    public       postgres    false    201   �,                 0    32837    pagos 
   TABLE DATA               X   COPY public.pagos (id_pago, fk_usu_adm, fk_cliente, fec_pago, cant_mes_pag) FROM stdin;
    public       postgres    false    203   �,                 0    24587    roles 
   TABLE DATA               5   COPY public.roles (id_role, descripcion) FROM stdin;
    public       postgres    false    197   $-                 0    32779    usuarios 
   TABLE DATA               �   COPY public.usuarios (id_usuario, nombre, apellido, cedula, telefono, fk_role, usuario, correo, hora_reg, fecha_reg, contrasena) FROM stdin;
    public       postgres    false    199   [-                  0    0    clientes_id_cliente_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.clientes_id_cliente_seq', 37, true);
            public       postgres    false    200                        0    0    forma_pago_id_pago_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.forma_pago_id_pago_seq', 41, true);
            public       postgres    false    202            !           0    0    roles_id_role_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.roles_id_role_seq', 2, true);
            public       postgres    false    196            "           0    0    usuarios_id_usuario_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 49, true);
            public       postgres    false    198            �
           2606    32842    pagos forma_pago_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT forma_pago_pkey PRIMARY KEY (id_pago);
 ?   ALTER TABLE ONLY public.pagos DROP CONSTRAINT forma_pago_pkey;
       public         postgres    false    203            �
           2606    32809    clientes pk_clientes 
   CONSTRAINT     Z   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT pk_clientes PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.clientes DROP CONSTRAINT pk_clientes;
       public         postgres    false    201            �
           2606    32789    roles roles_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_role);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public         postgres    false    197            �
           2606    32784    usuarios usuarios_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public         postgres    false    199            �
           2606    40988    pagos fk_cliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT fk_cliente FOREIGN KEY (fk_cliente) REFERENCES public.clientes(id_cliente) NOT VALID;
 :   ALTER TABLE ONLY public.pagos DROP CONSTRAINT fk_cliente;
       public       postgres    false    203    201    2698            �
           2606    32792    usuarios fk_role    FK CONSTRAINT     ~   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_role FOREIGN KEY (fk_role) REFERENCES public.roles(id_role) NOT VALID;
 :   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT fk_role;
       public       postgres    false    199    2694    197            �
           2606    40983    pagos fk_usu_adm    FK CONSTRAINT     �   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT fk_usu_adm FOREIGN KEY (fk_usu_adm) REFERENCES public.usuarios(id_usuario) NOT VALID;
 :   ALTER TABLE ONLY public.pagos DROP CONSTRAINT fk_usu_adm;
       public       postgres    false    203    199    2696            �
           2606    32825    clientes fk_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT fk_usuario FOREIGN KEY (fk_usuario) REFERENCES public.usuarios(id_usuario) NOT VALID;
 =   ALTER TABLE ONLY public.clientes DROP CONSTRAINT fk_usuario;
       public       postgres    false    199    201    2696            
           0    24587    roles    ROW SECURITY     3   ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;            public       postgres    false    197               6   x�36�4202�50�56�44�25�26ҳ�46��60�4�D��0̀L�=... c�
�         (   x�31�4�46�4202�50�56�4�21�4����� ��9         '   x�3�LL����,.)JL�/�2�L��L�+I����� ��	�         �   x�]��
�0Eד_���#i�����Ml��F��TP����p�0�����*\�mԭ���փ u�� ���s.�������Ѷ��'�@��q��-#��Y�
[UW ����/��̣Ny)9�_C�l���'G�(7�_�\�1�	�
E�     