/*
  Warnings:

  - Changed the type of `name` on the `currencies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CurrencyEnum" AS ENUM ('USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'RUB', 'AUD', 'CAD', 'ZAR', 'BRL', 'MXN', 'CHF', 'SEK', 'NZD', 'KRW', 'SGD', 'NOK', 'TRY', 'HKD', 'DKK', 'PLN', 'TWD', 'THB', 'IDR', 'HUF', 'CZK', 'ILS', 'CLP', 'PHP', 'AED', 'COP', 'SAR', 'MYR', 'RON', 'KES', 'NGN', 'UAH', 'PKR', 'EGP', 'VND', 'IQD', 'KWD', 'DZD', 'QAR', 'BHD', 'LBP', 'JOD', 'CRC', 'HNL', 'NIO', 'GTQ', 'PAB', 'SVC', 'BZD', 'BBD', 'BSD', 'JMD', 'KYD', 'TTD', 'XCD', 'ANG', 'AWG', 'BMD', 'VEF', 'GYD', 'SRD', 'UYU', 'PYG', 'BOB', 'ARS', 'CLF', 'PEN', 'CUP', 'DOP', 'HTG', 'CUC', 'MXV', 'BWP', 'ZMW', 'MZN', 'MGA', 'MUR', 'MRO', 'MOP', 'MDL', 'LSL', 'LRD', 'LAK', 'KZT', 'KGS', 'KHR', 'KMF');

-- AlterTable
ALTER TABLE "currencies" DROP COLUMN "name",
ADD COLUMN     "name" "CurrencyEnum" NOT NULL;
