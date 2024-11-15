package de.monteurzimmer.monteurzimmer_booking.log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LogEntryService {
    @Autowired
    private LogEntryRepository logEntryRepository;

    public void log(String level, String message) {
        LogEntry logEntry = new LogEntry();
        logEntry.setTimestamp(LocalDateTime.now());
        logEntry.setLevel(level);
        logEntry.setMessage(message);
        logEntryRepository.save(logEntry);
    }

    public List<LogEntry> getAllLogs() {
        return logEntryRepository.findAllByOrderByTimestampDesc();
    }

    public List<LogEntry> getAllLogsInLastFiveDays() {
        LocalDateTime startDate = LocalDateTime.now().minusDays(5);
        return logEntryRepository.findAllLogsInLastFiveDays(startDate);
    }
}

