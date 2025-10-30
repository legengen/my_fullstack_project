package tacos.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import tacos.TacoOrder;

@Slf4j
@RestController
@RequestMapping("/api")
public class OrderController {

    @PostMapping("/orders")
    public String processOrder(@RequestBody TacoOrder order) {
        log.info("Order submitted: " + order);
        return order.getDeliveryName();
    }
}
