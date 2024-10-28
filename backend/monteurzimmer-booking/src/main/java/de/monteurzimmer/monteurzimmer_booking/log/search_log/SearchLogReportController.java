package de.monteurzimmer.monteurzimmer_booking.log.search_log;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class SearchLogReportController {

    @Autowired
    private SearchLogRepository searchLogRepository;

    @GetMapping("/admin/search-log-report")
    public ResponseEntity<byte[]> generateSearchLogReport(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {

        List<SearchLog> searchLogs = searchLogRepository.findByTimestampBetween(start, end);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (PdfWriter writer = new PdfWriter(baos);
             PdfDocument pdfDocument = new PdfDocument(writer);
             Document document = new Document(pdfDocument)) {

            document.add(new Paragraph("Search Log Report"));
            document.add(new Paragraph("Report generated for: " + start + " to " + end));
            document.add(new Paragraph("Total results: " + searchLogs.size()));

            // Create table with headers
            Table table = new Table(new float[]{1, 3, 2, 2, 2});
            table.addHeaderCell("ID");
            table.addHeaderCell("City");
            table.addHeaderCell("Distance");
            table.addHeaderCell("IP Address");
            table.addHeaderCell("Timestamp");

            // Fill table with data
            for (SearchLog log : searchLogs) {
                table.addCell(String.valueOf(log.getId()));
                table.addCell(log.getCity() != null ? log.getCity() : "N/A");
                table.addCell(log.getDistance() != null ? log.getDistance().toString() : "N/A");
                table.addCell(log.getIpAddress());
                table.addCell(log.getTimestamp().toString());
            }
            document.add(table);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }

        // Set headers for PDF response
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "search_log_report.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(baos.toByteArray());
    }
}
