package de.monteurzimmer.monteurzimmer_booking.log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class LogEntryController {
    @Autowired
    private LogEntryService logEntryService;

    @GetMapping
    public ResponseEntity<List<LogEntry>> getAllLogs() {
        List<LogEntry> logs = logEntryService.getAllLogsInLastFiveDays();
        return ResponseEntity.ok(logs);
    }
}

