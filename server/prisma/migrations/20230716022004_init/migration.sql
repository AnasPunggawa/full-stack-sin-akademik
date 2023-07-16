-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `roles_role_key`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_token` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `refreshToken` LONGTEXT NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `refresh_token_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `jenisKelamin` VARCHAR(191) NOT NULL,
    `tempatLahir` VARCHAR(191) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nomorHP` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_user_id_key`(`user_id`),
    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guru` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `jenisKelamin` VARCHAR(191) NOT NULL,
    `tempatLahir` VARCHAR(191) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nomorHP` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `guru_user_id_key`(`user_id`),
    UNIQUE INDEX `guru_nip_key`(`nip`),
    UNIQUE INDEX `guru_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siswa` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `nis` VARCHAR(191) NOT NULL,
    `jenisKelamin` VARCHAR(191) NOT NULL,
    `tempatLahir` VARCHAR(191) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `namaAyah` VARCHAR(191) NOT NULL,
    `namaIbu` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nomorHP` VARCHAR(191) NOT NULL,
    `tahunAngkatan` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `siswa_user_id_key`(`user_id`),
    UNIQUE INDEX `siswa_nisn_key`(`nisn`),
    UNIQUE INDEX `siswa_nis_key`(`nis`),
    UNIQUE INDEX `siswa_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `semester` (
    `id` VARCHAR(191) NOT NULL,
    `kodeSemester` VARCHAR(191) NOT NULL,
    `tahunAjaran` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `semester_kodeSemester_key`(`kodeSemester`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kelas` (
    `id` VARCHAR(191) NOT NULL,
    `kodeKelas` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `kode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `kelas_kodeKelas_key`(`kodeKelas`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matapelajaran` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `matapelajaran_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nilai` (
    `id` VARCHAR(191) NOT NULL,
    `siswa_id` VARCHAR(191) NOT NULL,
    `semester_id` VARCHAR(191) NOT NULL,
    `kelas_id` VARCHAR(191) NOT NULL,
    `guru_id` VARCHAR(191) NOT NULL,
    `matapelajaran_id` VARCHAR(191) NOT NULL,
    `nilai` VARCHAR(191) NOT NULL,
    `predikat` VARCHAR(191) NOT NULL,
    `catatan` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profil_sekolah` (
    `id` VARCHAR(191) NOT NULL,
    `npsn` VARCHAR(191) NULL,
    `nama_sekolah` VARCHAR(191) NULL,
    `nama_kepala_sekolah` VARCHAR(191) NULL,
    `nama_operator` VARCHAR(191) NULL,
    `akreditasi` VARCHAR(191) NULL,

    UNIQUE INDEX `profil_sekolah_npsn_key`(`npsn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `identitas_sekolah` (
    `id` VARCHAR(191) NOT NULL,
    `npsn` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `bentuk_pendidikan` VARCHAR(191) NULL,
    `status_kepemilikan` VARCHAR(191) NULL,
    `sk_pendirian_sekolah` VARCHAR(191) NULL,
    `tanggal_sk_pendirian` VARCHAR(191) NULL,
    `sk_izin_operasional` VARCHAR(191) NULL,
    `tanggal_sk_izin_operasional` VARCHAR(191) NULL,

    UNIQUE INDEX `identitas_sekolah_npsn_key`(`npsn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kontak_sekolah` (
    `id` VARCHAR(191) NOT NULL,
    `npsn` VARCHAR(191) NULL,
    `alamat` VARCHAR(191) NULL,
    `rt` VARCHAR(191) NULL,
    `rw` VARCHAR(191) NULL,
    `dusun` VARCHAR(191) NULL,
    `desa_kelurahan` VARCHAR(191) NULL,
    `kecamatan` VARCHAR(191) NULL,
    `kabupaten` VARCHAR(191) NULL,
    `provinsi` VARCHAR(191) NULL,
    `kode_pos` VARCHAR(191) NULL,
    `nomor_telepon` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    UNIQUE INDEX `kontak_sekolah_npsn_key`(`npsn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_guruTomatapelajaran` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_guruTomatapelajaran_AB_unique`(`A`, `B`),
    INDEX `_guruTomatapelajaran_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_semesterTosiswa` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_semesterTosiswa_AB_unique`(`A`, `B`),
    INDEX `_semesterTosiswa_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_kelasTosemester` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_kelasTosemester_AB_unique`(`A`, `B`),
    INDEX `_kelasTosemester_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_fkey` FOREIGN KEY (`role`) REFERENCES `roles`(`role`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `refresh_token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guru` ADD CONSTRAINT `guru_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nilai` ADD CONSTRAINT `nilai_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nilai` ADD CONSTRAINT `nilai_semester_id_fkey` FOREIGN KEY (`semester_id`) REFERENCES `semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nilai` ADD CONSTRAINT `nilai_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nilai` ADD CONSTRAINT `nilai_matapelajaran_id_fkey` FOREIGN KEY (`matapelajaran_id`) REFERENCES `matapelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nilai` ADD CONSTRAINT `nilai_guru_id_fkey` FOREIGN KEY (`guru_id`) REFERENCES `guru`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_guruTomatapelajaran` ADD CONSTRAINT `_guruTomatapelajaran_A_fkey` FOREIGN KEY (`A`) REFERENCES `guru`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_guruTomatapelajaran` ADD CONSTRAINT `_guruTomatapelajaran_B_fkey` FOREIGN KEY (`B`) REFERENCES `matapelajaran`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_semesterTosiswa` ADD CONSTRAINT `_semesterTosiswa_A_fkey` FOREIGN KEY (`A`) REFERENCES `semester`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_semesterTosiswa` ADD CONSTRAINT `_semesterTosiswa_B_fkey` FOREIGN KEY (`B`) REFERENCES `siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_kelasTosemester` ADD CONSTRAINT `_kelasTosemester_A_fkey` FOREIGN KEY (`A`) REFERENCES `kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_kelasTosemester` ADD CONSTRAINT `_kelasTosemester_B_fkey` FOREIGN KEY (`B`) REFERENCES `semester`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
