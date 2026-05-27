-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "regra" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ponto" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tipo_ponto" TEXT NOT NULL,
    "status_localizacao" TEXT NOT NULL,
    "latitude_batida" DOUBLE PRECISION NOT NULL,
    "longitude_batida" DOUBLE PRECISION NOT NULL,
    "horario_servidor" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash_auditoria" TEXT NOT NULL,

    CONSTRAINT "Ponto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogSaudeDispositivo" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "nivel_bateria" INTEGER NOT NULL,
    "esta_carregando" BOOLEAN NOT NULL,
    "gps_fake_detectado" BOOLEAN NOT NULL,
    "km_total_odometro" DOUBLE PRECISION NOT NULL,
    "gravado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogSaudeDispositivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OcorrenciaCampo" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tipo_incidente" TEXT NOT NULL,
    "tempo_ocioso_min" INTEGER NOT NULL,
    "latitude_evento" DOUBLE PRECISION NOT NULL,
    "longitude_evento" DOUBLE PRECISION NOT NULL,
    "foto_hash" TEXT,
    "observacao" TEXT,
    "notificado_cliente" BOOLEAN NOT NULL DEFAULT false,
    "registrado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OcorrenciaCampo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_matricula_key" ON "Usuario"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Ponto_hash_auditoria_key" ON "Ponto"("hash_auditoria");

-- AddForeignKey
ALTER TABLE "Ponto" ADD CONSTRAINT "Ponto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogSaudeDispositivo" ADD CONSTRAINT "LogSaudeDispositivo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OcorrenciaCampo" ADD CONSTRAINT "OcorrenciaCampo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
