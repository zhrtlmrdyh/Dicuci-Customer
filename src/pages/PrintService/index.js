import { Printer, Printers } from "react-native-bluetooth-escpos-printer";

class PrintService {
  static async printData(dataToPrint) {
    try {
      // Cari dan pilih printer
      const printers = await Printers.list();
      if (printers.length === 0) {
        throw new Error("Printer tidak ditemukan.");
      }
      const selectedPrinter = printers[0]; // Ubah sesuai dengan printer yang Anda gunakan

      // Hubungkan ke printer
      await Printer.connectPrinter(selectedPrinter);

      // Konfigurasi dan cetak data
      const options = {
        encoding: 'GBK', // Ubah sesuai dengan encoding yang digunakan oleh printer Anda
        codepage: 0, // Ubah sesuai dengan codepage yang digunakan oleh printer Anda
        widthtimes: 0, // Ukuran teks lebar (0-7), ubah sesuai kebutuhan
        heigthtimes: 0, // Ukuran teks tinggi (0-7), ubah sesuai kebutuhan
        fonttype: 0, // Jenis font (0-4), ubah sesuai kebutuhan
      };

      const { myorder } = dataToPrint;

      // Cetak data menggunakan perintah ESC/POS
      await Printer.setAlign('center');
      await Printer.printText(`PEMBAYARAN BERHASIL\n`);
      await Printer.setAlign('left');
      await Printer.printText(`Dibayar oleh: ${myorder.Pembayaran.nama}\n`);
      await Printer.printText(`Tanggal Pembayaran: ${myorder.Pembayaran.tgl_pembayaran}\n`);
      await Printer.printText(`Metode Pembayaran: ${myorder.Pembayaran.metode_pembayaran}\n`);
      // Cetak informasi lainnya sesuai kebutuhan

      // Putuskan koneksi dengan printer
      await Printer.disconnectPrinter();
    } catch (error) {
      console.log("Error saat mencetak:", error);
    }
  }
}

export default PrintService;
